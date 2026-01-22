import fetch from "node-fetch";

// API Keys - Replace with your actual keys
const GAFFA_API_KEY = "GAFFA_API_KEY_HERE";

// API Endpoint
const GAFFA_ENDPOINT = "https://api.gaffa.dev/v1/browser/requests";

// Target URL
const ARTICLE_URL =
  "https://demo.gaffa.dev/simulate/article?loadTime=0&showModal=false";

/**
 * Fetches a webpage and converts it to Markdown using Gaffa API
 * @param {string} url - The URL to fetch and convert
 * @returns {Promise<string>} The markdown content
 */
async function fetchMarkdownWithGaffa(url) {
  // Configure the Gaffa API request
  const payload = {
    url,
    proxy_location: "us", // Use US proxies
    async: false,
    max_cache_age: 0,
    settings: {
      record_request: false,
      actions: [
        { type: "generate_markdown" }, // Convert page to markdown
      ],
    },
  };

  // Make request to Gaffa API
  const response = await fetch(GAFFA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": GAFFA_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Gaffa API request failed: ${response.status} - ${errorText}`,
    );
  }

  // Get the markdown URL from the response
  const data = await response.json();
  const markdownUrl = data.data.actions[0].output; // First action is generate_markdown

  // Fetch the actual markdown content
  const mdResponse = await fetch(markdownUrl);
  if (!mdResponse.ok) {
    throw new Error("Failed to fetch markdown");
  }

  return mdResponse.text();
}

/**
 * Main function: Fetches markdown from a webpage
 */
async function main() {
  console.log("Fetching and converting webpage to markdown...");
  const markdown = await fetchMarkdownWithGaffa(ARTICLE_URL);

  console.log("\nMARKDOWN:");
  console.log(markdown);
}

// Run the main function
main().catch(console.error);
