# KASMI DOMAIN NEWS

KASMI DOMAIN NEWS is a web application that fetches news from multiple APIs, analyzes the content using a generative AI (Gemini), and suggests brandable, exact match, or Geo domain names based on current trends found in the news. It also provides a utility to check the availability of the suggested domains.

## Features

* **Multi-API News Fetching:** Integrates with MediaStack, GNews, NewsAPI, and Currents API.
* **Generative AI Analysis:** Utilizes Google Gemini to identify news trends and suggest domain names.
* **Domain Availability Check:** Connects to a WHOIS service to determine if suggested domains are available.
* **Customizable Parameters:** Allows users to configure news time range, article fetch depth, max words in domain, TLD, and the number of domains to generate.
* **API Quota Management:** Simple in-memory tracking to respect free-tier API daily request limits.
* **Clean UI:** Simple, single-page interface built with EJS, CSS, and vanilla JavaScript.

## Stack

* **Backend:** Node.js, Express.js
* **Frontend:** EJS (templating), standard CSS, client-side JavaScript
* **APIs:**
  * MediaStack
  * GNews
  * NewsAPI
  * Currents API
  * Google Gemini API
  * WHOIS service (`whois-json` npm package)

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/kasmi-domain-news.git
cd kasmi-domain-news
```