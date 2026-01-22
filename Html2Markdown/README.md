# Convert a Site to Markdown using Gaffa

This is the code behind the [HTML to Markdown tool](https://html2markdown.gaffa.dev/), which converts websites to markdown format using the Gaffa API with proxy support for reliable site access.

## What It Does

The `html_2_markdown.js` script demonstrates how to:

- Fetch web content using the Gaffa API's browser automation
- Convert HTML pages to clean Markdown format
- Access websites reliably through Gaffa's proxy infrastructure

The script fetches a webpage, waits for the content to load, and converts it to Markdown format. The Gaffa API handles all the complexity of web scraping, including proxy rotation for reliable access.

## Installation

```bash
npm install
```

## Usage

```bash
npm run start
```

Before running, make sure to update the configuration in `html_2_markdown.js`:

- `GAFFA_API_KEY` - Your Gaffa API key
- `ARTICLE_URL` - The URL you want to convert
