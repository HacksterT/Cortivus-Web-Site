import asyncio
from playwright.async_api import async_playwright
import os

async def generate_pdf():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Load the local HTML file
        path = os.path.abspath("dictionary/dictionary_pdf_source.html")
        await page.goto(f"file://{path}")
        
        # Wait for any content to load
        await page.wait_for_load_state("networkidle")
        
        # Generate PDF
        await page.pdf(
            path="dictionary/Translation_Dictionary.pdf",
            format="A4",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
        )
        
        await browser.close()
        print(f"PDF successfully generated: dictionary/Translation_Dictionary.pdf")

if __name__ == "__main__":
    asyncio.run(generate_pdf())
