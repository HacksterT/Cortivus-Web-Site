/**
 * Cortivus Insights - Effects Renderer
 *
 * Florence Nightingale polar stacked radial chart for ambient-listening effects data.
 * Two charts side by side: failure modes (negative polarity) and success modes (positive polarity).
 * Bidirectional concepts are excluded.
 *
 * Requires D3 v7 loaded externally as global `d3`.
 * Consumed by the effects view of the Insights tracker.
 */

const EffectsRenderer = (function () {
    'use strict';

    const EFFECTS_DATA_URL = '/insights/tracker/data/effects/ambient-listening.json';

    const INNER_STUB_RADIUS = 44;
    const MAX_RADIUS = 170;
    const PAD_ANGLE = 0.018;

    const MAGNITUDE_THICKNESS = { high: 40, moderate: 22, low: 10 };

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Lazy-initialized once D3 is available — shared across renderChart and renderDemo
    var arcGen = null;

    const STUDY_COLORS = {
        'rct': '#4d9fff',
        'qualitative': '#ffc800',
        'case-series': '#c87aff',
        'mixed-methods': '#00d4aa',
        'regulatory': '#ff8c42'
    };

    const STUDY_DESIGN_LABELS = {
        'rct': 'Randomized Controlled Trial',
        'qualitative': 'Qualitative Study',
        'case-series': 'Case Series',
        'mixed-methods': 'Mixed Methods',
        'regulatory': 'Regulatory Document'
    };

    const CHART_CONFIG = {
        failure: {
            title: 'FAILURE MODES',
            titleColor: '#ff006e',
            innerRingColor: 'rgba(255,0,110,0.25)',
            stubColor: 'rgba(255,0,110,0.15)',
            mobileHeader: 'Failure Modes',
            badgeColor: '#ff006e',
            badgeBackground: 'rgba(255,0,110,0.18)'
        },
        success: {
            title: 'SUCCESS MODES',
            titleColor: '#00f5ff',
            innerRingColor: 'rgba(0,245,255,0.18)',
            stubColor: 'rgba(0,245,255,0.12)',
            mobileHeader: 'Success Modes',
            badgeColor: '#00f5ff',
            badgeBackground: 'rgba(0,245,255,0.15)'
        }
    };

    // -------------------------------------------------------------------------
    // Utility
    // -------------------------------------------------------------------------

    function capitalize(s) {
        if (!s) return '';
        var str = String(s);
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function clearContainer(el) {
        while (el.firstChild) { el.removeChild(el.firstChild); }
    }

    function magnitudeThickness(ordinal) {
        return MAGNITUDE_THICKNESS[ordinal] || 6;
    }

    function totalWeight(concept) {
        return (concept.evidence_refs || []).reduce(function (s, r) {
            return s + magnitudeThickness(r.magnitude_ordinal);
        }, 0);
    }

    // -------------------------------------------------------------------------
    // Band geometry builder
    // -------------------------------------------------------------------------

    /**
     * Compute band and slice geometry for one chart's concepts.
     *
     * Returns { bands, scale, sortedConcepts, slices }
     * slices: [{ concept, startAngle, endAngle, midAngle }] — precomputed per-wedge angles
     * used by renderChart for identity rings and labels without recomputing.
     */
    function buildBands(concepts, chartType) {
        // Precompute weights once to avoid O(n log n) totalWeight calls during sort
        var weights = new Map(concepts.map(function (c) { return [c, totalWeight(c)]; }));

        var sorted = concepts.slice().sort(function (a, b) {
            return weights.get(a) - weights.get(b);
        });

        var n = sorted.length;
        if (n === 0) return { bands: [], scale: 1, sortedConcepts: [], slices: [] };

        var sliceAngle = (2 * Math.PI) / n;
        var maxW = sorted.reduce(function (m, c) { return Math.max(m, weights.get(c)); }, 0);
        var scale = maxW > 0 ? (MAX_RADIUS - INNER_STUB_RADIUS) / maxW : 1;

        var bands = [];
        var slices = [];

        sorted.forEach(function (concept, i) {
            var startAngle = i * sliceAngle + PAD_ANGLE / 2;
            var endAngle = (i + 1) * sliceAngle - PAD_ANGLE / 2;
            var refs = concept.evidence_refs || [];
            var wedgeOuter = refs.length > 0
                ? INNER_STUB_RADIUS + weights.get(concept) * scale
                : INNER_STUB_RADIUS + 3;
            slices.push({
                concept: concept,
                startAngle: startAngle,
                endAngle: endAngle,
                midAngle: (startAngle + endAngle) / 2,
                outerRadius: wedgeOuter
            });

            if (refs.length === 0) {
                bands.push({
                    startAngle: startAngle, endAngle: endAngle,
                    innerRadius: INNER_STUB_RADIUS, outerRadius: INNER_STUB_RADIUS + 3,
                    ref: null, chartType: chartType, isStub: true
                });
                return;
            }

            var cursor = INNER_STUB_RADIUS;
            refs.forEach(function (ref) {
                var thickness = magnitudeThickness(ref.magnitude_ordinal) * scale;
                bands.push({
                    startAngle: startAngle, endAngle: endAngle,
                    innerRadius: cursor, outerRadius: cursor + thickness,
                    ref: ref, chartType: chartType, isStub: false
                });
                cursor += thickness;
            });
        });

        return { bands: bands, scale: scale, sortedConcepts: sorted, slices: slices };
    }

    // -------------------------------------------------------------------------
    // Hover card
    // -------------------------------------------------------------------------

    var _hoverCard = null;
    var _cardNodes = null;

    function injectStyles() {
        if (document.getElementById('effects-renderer-styles')) { return; }
        var s = document.createElement('style');
        s.id = 'effects-renderer-styles';
        s.textContent =
            '.effects-card{position:fixed;background:#111;border:1px solid rgba(0,245,255,0.2);border-radius:10px;padding:1.25rem 1.5rem;max-width:320px;z-index:9999;pointer-events:none;box-shadow:0 8px 32px rgba(0,0,0,0.6)}' +
            '.effects-card-design{display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem}' +
            '.effects-card-design-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}' +
            '.effects-card-design-label{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:#888}' +
            '.effects-card-title{font-size:0.95rem;font-weight:700;color:#e0e0e0;line-height:1.4;margin-bottom:0.6rem}' +
            '.effects-card-meta{display:flex;gap:0.75rem;flex-wrap:wrap;font-size:0.75rem;color:#888;margin-bottom:0.5rem}' +
            '.effects-card-direction{font-size:0.8rem;color:#aaa;margin-bottom:0.5rem}' +
            '.effects-card-quote{font-size:0.82rem;color:#aaa;line-height:1.55;font-style:italic;border-left:3px solid rgba(0,245,255,0.3);padding-left:0.75rem;margin-top:0.5rem}' +
            '.effects-concept-card{position:fixed;background:#111;border:1px solid rgba(0,245,255,0.15);border-radius:10px;padding:1rem 1.25rem;max-width:270px;z-index:9999;pointer-events:none;box-shadow:0 8px 32px rgba(0,0,0,0.6)}' +
            '.effects-concept-polarity{font-size:0.62rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.45rem}' +
            '.effects-concept-name{font-size:0.88rem;font-weight:700;color:#e0e0e0;margin-bottom:0.45rem;line-height:1.3}' +
            '.effects-concept-desc{font-size:0.78rem;color:#aaa;line-height:1.5}' +
            '.effects-concept-enabler{font-size:0.73rem;color:#666;line-height:1.45;margin-top:0.5rem;padding-top:0.5rem;border-top:1px solid #1e1e1e}' +
            '.effects-concept-enabler em{display:block;font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;color:#444;font-style:normal;margin-bottom:0.2rem}';
        document.head.appendChild(s);
    }

    function createHoverCard() {
        injectStyles();
        var existing = document.getElementById('effects-hover-card');
        if (!existing) {
            var card = document.createElement('div');
            card.id = 'effects-hover-card';
            card.className = 'effects-card';
            card.style.cssText = 'display:none;position:fixed;z-index:9999;pointer-events:none';
            card.innerHTML =
                '<div class="effects-card-design">' +
                    '<span class="effects-card-design-dot"></span>' +
                    '<span class="effects-card-design-label"></span>' +
                '</div>' +
                '<div class="effects-card-title"></div>' +
                '<div class="effects-card-meta">' +
                    '<span class="effects-card-date"></span>' +
                    '<span class="effects-card-magnitude"></span>' +
                    '<span class="effects-card-strength"></span>' +
                '</div>' +
                '<div class="effects-card-direction"></div>' +
                '<div class="effects-card-quote"></div>';
            document.body.appendChild(card);
            existing = card;
        }
        _hoverCard = existing;
        // Cache child refs once — avoids 8 querySelector calls on every mouseenter
        _cardNodes = {
            dot:       _hoverCard.querySelector('.effects-card-design-dot'),
            label:     _hoverCard.querySelector('.effects-card-design-label'),
            title:     _hoverCard.querySelector('.effects-card-title'),
            date:      _hoverCard.querySelector('.effects-card-date'),
            magnitude: _hoverCard.querySelector('.effects-card-magnitude'),
            strength:  _hoverCard.querySelector('.effects-card-strength'),
            direction: _hoverCard.querySelector('.effects-card-direction'),
            quote:     _hoverCard.querySelector('.effects-card-quote')
        };
    }

    function positionCard(card, event, cardWidth, cardHeight) {
        var x = event.clientX + 16;
        var y = event.clientY + 16;
        if (x + cardWidth  > window.innerWidth)  { x = event.clientX - (cardWidth  + 16); }
        if (y + cardHeight > window.innerHeight) { y = event.clientY - (cardHeight + 16); }
        card.style.left    = x + 'px';
        card.style.top     = y + 'px';
        card.style.display = 'block';
    }

    function showCard(event, bandData) {
        if (!_hoverCard || !bandData || !bandData.ref) return;

        var ref = bandData.ref;
        _cardNodes.dot.style.backgroundColor = STUDY_COLORS[ref.study_design] || '#606060';
        _cardNodes.label.textContent     = STUDY_DESIGN_LABELS[ref.study_design] || ref.study_design || '';
        _cardNodes.title.textContent     = ref.source_title || '';
        _cardNodes.date.textContent      = ref.source_date || '';
        _cardNodes.magnitude.textContent = ref.magnitude_ordinal ? ('Magnitude: ' + capitalize(ref.magnitude_ordinal)) : '';
        _cardNodes.strength.textContent  = ref.claim_strength || '';
        _cardNodes.direction.textContent = ref.direction ? ('Direction: ' + ref.direction) : '';
        _cardNodes.quote.textContent     = ref.extracted_quote ? ('"' + ref.extracted_quote + '"') : '';

        positionCard(_hoverCard, event, 320, 240);
    }

    function hideCard() {
        if (_hoverCard) { _hoverCard.style.display = 'none'; }
    }

    // -------------------------------------------------------------------------
    // Concept definition card
    // -------------------------------------------------------------------------

    var _conceptCard = null;
    var _conceptNodes = null;

    function createConceptCard() {
        var existing = document.getElementById('effects-concept-card');
        if (!existing) {
            var card = document.createElement('div');
            card.id = 'effects-concept-card';
            card.className = 'effects-concept-card';
            card.style.display = 'none';
            card.innerHTML =
                '<div class="effects-concept-polarity"></div>' +
                '<div class="effects-concept-name"></div>' +
                '<div class="effects-concept-desc"></div>' +
                '<div class="effects-concept-enabler"></div>';
            document.body.appendChild(card);
            existing = card;
        }
        _conceptCard = existing;
        _conceptNodes = {
            polarity: _conceptCard.querySelector('.effects-concept-polarity'),
            name:     _conceptCard.querySelector('.effects-concept-name'),
            desc:     _conceptCard.querySelector('.effects-concept-desc'),
            enabler:  _conceptCard.querySelector('.effects-concept-enabler')
        };
    }

    function showConceptCard(event, concept, config) {
        if (!_conceptCard) return;
        _conceptNodes.polarity.textContent = config.title;
        _conceptNodes.polarity.style.color = config.titleColor;
        _conceptNodes.name.textContent = concept.name;
        _conceptNodes.desc.textContent = concept.description || '';
        var firstEnabler = (concept.enablers || [])[0];
        if (firstEnabler) {
            _conceptNodes.enabler.style.display = 'block';
            _conceptNodes.enabler.innerHTML = '<em>How it happens</em>' + firstEnabler;
        } else {
            _conceptNodes.enabler.style.display = 'none';
        }
        positionCard(_conceptCard, event, 270, 180);
    }

    function hideConceptCard() {
        if (_conceptCard) { _conceptCard.style.display = 'none'; }
    }

    // -------------------------------------------------------------------------
    // Label helper
    // -------------------------------------------------------------------------

    function wrapConceptLabel(textEl, name) {
        if (name.length <= 20) {
            textEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')).textContent = name;
            return;
        }
        var breakAt = name.lastIndexOf(' ', 19);
        if (breakAt === -1) { breakAt = 20; }
        var line1 = name.slice(0, breakAt);
        var line2 = name.slice(breakAt + (name[breakAt] === ' ' ? 1 : 0));

        var ts1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        ts1.setAttribute('dy', '0');
        ts1.textContent = line1;
        textEl.appendChild(ts1);

        var ts2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        ts2.setAttribute('dy', '14');
        ts2.setAttribute('x', textEl.getAttribute('x') || '0');
        ts2.textContent = line2;
        textEl.appendChild(ts2);
    }

    // -------------------------------------------------------------------------
    // SVG chart renderer
    // -------------------------------------------------------------------------

    function renderChart(container, concepts, chartType) {
        clearContainer(container);

        var config = CHART_CONFIG[chartType];
        var result = buildBands(concepts, chartType);
        var bands = result.bands;
        var slices = result.slices;

        var svg = d3.select(container)
            .append('svg')
            .attr('viewBox', '0 0 400 420')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('width', '100%')
            .style('display', 'block')
            .style('overflow', 'visible');

        var g = svg.append('g').attr('transform', 'translate(200,210)');

        svg.append('text')
            .attr('x', 200).attr('y', 22)
            .attr('text-anchor', 'middle')
            .attr('fill', config.titleColor)
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('letter-spacing', '0.12em')
            .text(config.title);

        // Grid rings at 25%, 50%, 75% of radial range
        var ringRange = MAX_RADIUS - INNER_STUB_RADIUS;
        [0.25, 0.50, 0.75].forEach(function (pct) {
            g.append('circle')
                .attr('r', INNER_STUB_RADIUS + ringRange * pct)
                .attr('fill', 'none')
                .attr('stroke', 'rgba(255,255,255,0.06)')
                .attr('stroke-width', 1);
        });

        arcGen = arcGen || d3.arc();

        // Evidence bands
        bands.forEach(function (band) {
            var color = band.isStub
                ? config.stubColor
                : (STUDY_COLORS[band.ref.study_design] || '#606060');

            var path = g.append('path')
                .attr('d', arcGen({
                    innerRadius: band.innerRadius,
                    outerRadius: band.outerRadius,
                    startAngle: band.startAngle,
                    endAngle: band.endAngle
                }))
                .attr('fill', color)
                .attr('stroke', 'rgba(0,0,0,0.3)')
                .attr('stroke-width', 0.5);

            if (!band.isStub) {
                path
                    .style('cursor', 'pointer')
                    .on('mouseenter', function (event) { showCard(event, band); })
                    .on('mouseleave', hideCard);
            }
        });

        // Identity ring + concept label — single pass using precomputed slice angles from buildBands
        slices.forEach(function (slice) {
            g.append('path')
                .attr('d', arcGen({
                    innerRadius: INNER_STUB_RADIUS - 10,
                    outerRadius: INNER_STUB_RADIUS - 2,
                    startAngle: slice.startAngle,
                    endAngle: slice.endAngle
                }))
                .attr('fill', config.innerRingColor)
                .attr('stroke', 'none');

            var labelR = Math.max(INNER_STUB_RADIUS + 20, slice.outerRadius + 12);
            var textX  = Math.sin(slice.midAngle) * labelR;
            var textY  = -Math.cos(slice.midAngle) * labelR;
            var anchor = textX > 5 ? 'start' : (textX < -5 ? 'end' : 'middle');

            var textEl = g.append('text')
                .attr('x', textX).attr('y', textY)
                .attr('text-anchor', anchor)
                .attr('dominant-baseline', 'middle')
                .attr('fill', '#888888')
                .attr('font-size', '9.5px')
                .attr('font-weight', '600');

            wrapConceptLabel(textEl.node(), slice.concept.name);

            // Info icon — flows after whatever line wrapConceptLabel produced
            (function (concept) {
                textEl.append('tspan')
                    .text(' ⓘ')
                    .attr('fill', 'rgba(0,245,255,0.35)')
                    .attr('font-size', '8px')
                    .attr('font-weight', '400')
                    .style('cursor', 'help')
                    .on('mouseenter', function (event) { showConceptCard(event, concept, config); })
                    .on('mouseleave', hideConceptCard);
            }(slice.concept));
        });
    }

    // -------------------------------------------------------------------------
    // Mobile fallback
    // -------------------------------------------------------------------------

    function renderMobileList(container, concepts, config) {
        clearContainer(container);

        var header = document.createElement('div');
        header.style.cssText = 'color:' + config.badgeColor + ';font-size:11px;font-weight:bold;' +
            'letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px';
        header.textContent = config.mobileHeader;
        container.appendChild(header);

        concepts.forEach(function (concept, i) {
            var refs = concept.evidence_refs || [];

            var row = document.createElement('div');
            row.style.cssText = 'display:flex;align-items:center;gap:10px;padding:8px 0;' +
                'border-bottom:1px solid rgba(255,255,255,0.06)';

            var rank = document.createElement('span');
            rank.style.cssText = 'color:#555;font-size:12px;min-width:18px;text-align:right';
            rank.textContent = (i + 1) + '.';
            row.appendChild(rank);

            var name = document.createElement('span');
            name.style.cssText = 'flex:1;font-size:13px;color:#ccc';
            name.textContent = concept.name;
            row.appendChild(name);

            var badge = document.createElement('span');
            badge.style.cssText = 'background:' + config.badgeBackground + ';color:' + config.badgeColor + ';' +
                'border-radius:10px;padding:2px 8px;font-size:11px;font-weight:bold;white-space:nowrap';
            badge.textContent = refs.length + ' ref' + (refs.length !== 1 ? 's' : '');
            row.appendChild(badge);

            var bars = document.createElement('div');
            bars.style.cssText = 'display:flex;align-items:flex-end;gap:2px;height:22px';
            refs.forEach(function (ref) {
                var barH = Math.round((magnitudeThickness(ref.magnitude_ordinal) / 40) * 18) + 4;
                var bar = document.createElement('div');
                bar.style.cssText = 'width:6px;height:' + barH + 'px;border-radius:2px;background:' +
                    (STUDY_COLORS[ref.study_design] || '#606060');
                bars.appendChild(bar);
            });
            row.appendChild(bars);

            container.appendChild(row);
        });
    }

    function renderMobile(failureContainer, successContainer, data) {
        var weights = new Map(data.concepts.map(function (c) { return [c, totalWeight(c)]; }));
        function sortDesc(arr) {
            return arr.slice().sort(function (a, b) { return weights.get(b) - weights.get(a); });
        }
        renderMobileList(
            failureContainer,
            sortDesc(data.concepts.filter(function (c) { return c.polarity === 'negative'; })),
            CHART_CONFIG.failure
        );
        renderMobileList(
            successContainer,
            sortDesc(data.concepts.filter(function (c) { return c.polarity === 'positive'; })),
            CHART_CONFIG.success
        );
    }

    // -------------------------------------------------------------------------
    // Public: load
    // -------------------------------------------------------------------------

    function load(url) {
        return fetch(url || EFFECTS_DATA_URL, { cache: 'no-store' })
            .then(function (res) {
                if (!res.ok) throw new Error('Effects data fetch failed: ' + res.status);
                return res.json();
            });
    }

    // -------------------------------------------------------------------------
    // Public: render
    // -------------------------------------------------------------------------

    function render(failureContainer, successContainer, data) {
        if (typeof d3 === 'undefined') throw new Error('D3 not loaded');

        if (window.matchMedia('(max-width: 768px)').matches) {
            renderMobile(failureContainer, successContainer, data);
            return;
        }

        createHoverCard();
        createConceptCard();
        renderChart(failureContainer,  data.concepts.filter(function (c) { return c.polarity === 'negative'; }), 'failure');
        renderChart(successContainer, data.concepts.filter(function (c) { return c.polarity === 'positive'; }), 'success');
    }

    // -------------------------------------------------------------------------
    // Public: renderMeta
    // -------------------------------------------------------------------------

    function renderMeta(container, data) {
        var meta = data.meta || {};
        var concepts = data.concepts || [];
        var evidenceCount = concepts.reduce(function(sum, c) {
            return c.polarity !== 'bidirectional' ? sum + (c.evidence_refs || []).length : sum;
        }, 0);

        var dateStr = '';
        if (meta.generated) {
            var d = new Date(meta.generated);
            if (!isNaN(d.getTime())) {
                dateStr = MONTHS[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
            }
        }

        var text = evidenceCount + ' evidence ref' + (evidenceCount !== 1 ? 's' : '') +
            ' from ' + (meta.source_count || 0) + ' source' + (meta.source_count !== 1 ? 's' : '') +
            ' across ' + (meta.workflow_count || 0) + ' workflow' + (meta.workflow_count !== 1 ? 's' : '');
        if (dateStr) { text += ' · Snapshot: ' + dateStr; }

        clearContainer(container);
        var el = document.createElement('div');
        el.className = 'effects-meta-line';
        el.style.cssText = 'font-size:11px;color:#666;letter-spacing:0.03em';
        el.textContent = text;
        container.appendChild(el);
    }

    // -------------------------------------------------------------------------
    // Public: renderLegend
    // -------------------------------------------------------------------------

    function renderLegend(container) {
        clearContainer(container);

        var strip = document.createElement('div');
        strip.className = 'effects-legend-strip';
        strip.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px;align-items:center';

        Object.keys(STUDY_COLORS).forEach(function (key) {
            var item = document.createElement('div');
            item.className = 'effects-legend-item';
            item.style.cssText = 'display:flex;align-items:center;gap:6px';

            var swatch = document.createElement('span');
            swatch.style.cssText = 'display:inline-block;width:12px;height:12px;border-radius:3px;' +
                'flex-shrink:0;background:' + STUDY_COLORS[key];
            item.appendChild(swatch);

            var label = document.createElement('span');
            label.style.cssText = 'font-size:11px;color:#888';
            label.textContent = STUDY_DESIGN_LABELS[key];
            item.appendChild(label);

            strip.appendChild(item);
        });

        container.appendChild(strip);
    }

    // -------------------------------------------------------------------------
    // Demo chart (annotated guide — fake data, no hover events)
    // -------------------------------------------------------------------------

    function renderDemo(container) {
        if (typeof d3 === 'undefined') return;
        clearContainer(container);

        var fakeConcepts = [
            { name: 'Mode A', evidence_refs: [
                { study_design: 'qualitative', magnitude_ordinal: 'low' }
            ]},
            { name: 'Mode B', evidence_refs: [
                { study_design: 'mixed-methods', magnitude_ordinal: 'moderate' }
            ]},
            { name: 'Mode C', evidence_refs: [
                { study_design: 'rct', magnitude_ordinal: 'high' },
                { study_design: 'qualitative', magnitude_ordinal: 'moderate' }
            ]}
        ];

        var result = buildBands(fakeConcepts, 'failure');
        arcGen = arcGen || d3.arc();

        var svg = d3.select(container)
            .append('svg')
            .attr('viewBox', '0 0 400 240')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('width', '100%')
            .style('display', 'block')
            .style('overflow', 'visible');

        var g = svg.append('g').attr('transform', 'translate(200,200)');

        result.bands.forEach(function (band) {
            g.append('path')
                .attr('d', arcGen({
                    innerRadius: band.innerRadius,
                    outerRadius: band.outerRadius,
                    startAngle: band.startAngle,
                    endAngle: band.endAngle
                }))
                .attr('fill', band.isStub
                    ? 'rgba(255,0,110,0.15)'
                    : (STUDY_COLORS[band.ref.study_design] || '#606060'))
                .attr('stroke', 'rgba(0,0,0,0.3)')
                .attr('stroke-width', 0.5)
                .attr('opacity', 0.9);
        });

        result.slices.forEach(function (slice) {
            g.append('path')
                .attr('d', arcGen({
                    innerRadius: INNER_STUB_RADIUS - 10,
                    outerRadius: INNER_STUB_RADIUS - 2,
                    startAngle: slice.startAngle,
                    endAngle: slice.endAngle
                }))
                .attr('fill', 'rgba(255,0,110,0.25)');
        });
    }

    // -------------------------------------------------------------------------
    // Module export
    // -------------------------------------------------------------------------

    return {
        load: load,
        render: render,
        renderDemo: renderDemo,
        renderMeta: renderMeta,
        renderLegend: renderLegend,
        EFFECTS_DATA_URL: EFFECTS_DATA_URL
    };
})();
