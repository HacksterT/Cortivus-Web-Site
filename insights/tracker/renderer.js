/**
 * Cortivus AI Safety Hub - Tracker Renderer
 *
 * Shared rendering library for the tracker page and the Insights hub band.
 * Consumed by /insights/tracker/index.html and /insights/index.html.
 *
 * Data contract: see /insights/tracker/data/AGENT_CONTRACT.md
 */

const TrackerRenderer = (function () {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const typeLabels = {
        'litigation': 'Litigation',
        'regulatory': 'Regulatory',
        'research': 'Research',
        'industry': 'Industry',
        'failure-case': 'Failure Case'
    };

    const statusLabels = {
        'active': 'Active',
        'monitoring': 'Monitoring',
        'cooling': 'Cooling'
    };

    function formatDate(dateStr) {
        if (!dateStr) return '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            const parts = dateStr.split('-');
            return MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parseInt(parts[2], 10) + ', ' + parts[0];
        }
        if (/^\d{4}-\d{2}$/.test(dateStr)) {
            const parts = dateStr.split('-');
            return MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
        }
        return dateStr;
    }

    function formatRelativeTime(isoString) {
        if (!isoString) return '';
        const then = new Date(isoString).getTime();
        if (isNaN(then)) return '';
        const now = Date.now();
        const diff = now - then;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (days > 30) {
            const d = new Date(isoString);
            return MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
        }
        if (days > 0) return days + ' day' + (days === 1 ? '' : 's') + ' ago';
        if (hours > 0) return hours + ' hour' + (hours === 1 ? '' : 's') + ' ago';
        if (minutes > 0) return minutes + ' min ago';
        if (diff >= 0) return 'just now';
        return '';
    }

    function dateForSort(s) {
        if (!s) return 0;
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(s + 'T00:00:00Z').getTime();
        if (/^\d{4}-\d{2}$/.test(s)) return new Date(s + '-15T00:00:00Z').getTime();
        const m = s.match(/(\d{4})/g);
        if (m) return new Date(m[m.length - 1] + '-06-15T00:00:00Z').getTime();
        return 0;
    }

    function withinDays(isoString, days) {
        if (!isoString) return false;
        const t = new Date(isoString).getTime();
        if (isNaN(t)) return false;
        return (Date.now() - t) <= days * 86400000 && (Date.now() - t) >= 0;
    }

    function escapeHtml(s) {
        if (s == null) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function computeItemBadges(item) {
        const badges = new Set();
        if (withinDays(item.first_added, 7)) badges.add('new');
        if (item.first_added && item.last_updated && item.first_added !== item.last_updated && withinDays(item.last_updated, 7)) {
            badges.add('updated');
        }
        if (item.update_log && item.update_log.some(function (u) { return withinDays(u.timestamp, 7); })) {
            badges.add('updated');
        }
        if (item.verified === false) badges.add('unverified');
        return Array.from(badges);
    }

    function computeTopicStatus(topic) {
        const items = topic.items || [];
        const hasRecentActivity = items.some(function (item) {
            if (withinDays(item.first_added, 14)) return true;
            if (withinDays(item.last_updated, 14)) return true;
            return (item.update_log || []).some(function (u) { return withinDays(u.timestamp, 14); });
        });
        if (hasRecentActivity) return 'active';
        if (topic.auto_managed && withinDays(topic.last_run, 14)) return 'monitoring';
        if (!topic.auto_managed) {
            // For curated topics, look at latest item update date
            const latestUpdate = items.reduce(function (max, i) {
                const t = i.last_updated ? new Date(i.last_updated).getTime() : 0;
                return Math.max(max, isNaN(t) ? 0 : t);
            }, 0);
            if (latestUpdate && (Date.now() - latestUpdate) < 45 * 86400000) return 'monitoring';
        }
        return 'cooling';
    }

    function renderSourcePills(sources) {
        if (!sources || sources.length === 0) return '';
        const pills = sources.map(function (s) {
            const label = escapeHtml(s.name);
            const typeLabel = s.type ? '<span class="tracker-source-type">' + escapeHtml(s.type) + '</span>' : '';
            if (s.url) {
                return '<a href="' + escapeHtml(s.url) + '" target="_blank" rel="noopener" class="tracker-source-pill">' +
                    '<i class="fas fa-external-link-alt"></i> ' + label + typeLabel + '</a>';
            }
            return '<span class="tracker-source-pill tracker-source-pill-nourl" title="No direct URL on file yet">' +
                '<i class="fas fa-bookmark"></i> ' + label + typeLabel + '</span>';
        });
        return '<div class="tracker-sources"><span class="tracker-sources-label">Sources</span>' + pills.join('') + '</div>';
    }

    function renderUpdateLog(log) {
        if (!log || log.length === 0) return '';
        const sorted = log.slice().sort(function (a, b) {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        const entries = sorted.map(function (u) {
            let sourceLink = '';
            if (u.source) {
                if (u.source.url) {
                    sourceLink = ' <a href="' + escapeHtml(u.source.url) + '" target="_blank" rel="noopener" class="tracker-update-source">' + escapeHtml(u.source.name) + ' <i class="fas fa-external-link-alt"></i></a>';
                } else if (u.source.name) {
                    sourceLink = ' <span class="tracker-update-source-nolink">' + escapeHtml(u.source.name) + '</span>';
                }
            }
            const addedBy = u.added_by ? '<span class="tracker-update-by">' + escapeHtml(u.added_by) + '</span>' : '';
            return '<li>' +
                '<span class="tracker-update-date">' + escapeHtml(formatRelativeTime(u.timestamp)) + '</span>' +
                '<span class="tracker-update-note">' + escapeHtml(u.note) + '</span>' +
                sourceLink + addedBy +
                '</li>';
        });
        return '<div class="tracker-update-log">' +
            '<div class="tracker-update-log-label"><i class="fas fa-history"></i> Updates (' + log.length + ')</div>' +
            '<ul>' + entries.join('') + '</ul>' +
            '</div>';
    }

    /**
     * Fetch the manifest and all topic files.
     * Returns Promise<{ manifest, topics }>
     */
    function loadAllTopics(manifestUrl) {
        return fetch(manifestUrl, { cache: 'no-store' })
            .then(function (res) {
                if (!res.ok) throw new Error('Manifest fetch failed: ' + res.status);
                return res.json();
            })
            .then(function (manifest) {
                const basePath = manifestUrl.substring(0, manifestUrl.lastIndexOf('/') + 1);
                const topicPromises = (manifest.topics || []).map(function (t) {
                    return fetch(basePath + t.file, { cache: 'no-store' })
                        .then(function (res) {
                            if (!res.ok) throw new Error('Topic fetch failed: ' + t.id);
                            return res.json();
                        });
                });
                return Promise.all(topicPromises).then(function (topics) {
                    return { manifest: manifest, topics: topics };
                });
            });
    }

    return {
        MONTHS: MONTHS,
        typeLabels: typeLabels,
        statusLabels: statusLabels,
        formatDate: formatDate,
        formatRelativeTime: formatRelativeTime,
        dateForSort: dateForSort,
        withinDays: withinDays,
        escapeHtml: escapeHtml,
        computeItemBadges: computeItemBadges,
        computeTopicStatus: computeTopicStatus,
        renderSourcePills: renderSourcePills,
        renderUpdateLog: renderUpdateLog,
        loadAllTopics: loadAllTopics
    };
})();
