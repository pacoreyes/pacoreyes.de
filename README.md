# pacoreyes.de - Personal Website

This repository contains the source code for my personal website, [pacoreyes.de](https://pacoreyes.de), showcasing my professional journey as an AI Engineer and machine learning expert.

## Technology Stack

- **Static Site Generator**: [Eleventy (11ty)](https://www.11ty.dev/) - A simpler static site generator
- **Templating**: Nunjucks (.njk) for flexible templating
- **Styling**: Custom CSS with modern features
- **Deployment**: Firebase Hosting for reliable and fast content delivery
- **Code Quality**: ESLint, Stylelint, and Prettier for consistent code style
- **Build Process**: NPM scripts for building, serving, and quality checks
- **Multi-language Support**: Separate content directories for English, German, and Spanish

## Project Structure

- `/src`: Source files for the website
  - `/_data`: JSON and JS data files that power the site
  - `/_includes`: Reusable template components
  - `/css`: Styling for the website
  - `/images`: Website images and icons
  - `/en`: English language content
  - `/de`: German language content
  - `/es`: Spanish language content
- `/public`: Generated output (not tracked in git)

## Local Development

### Prerequisites

- Node.js (v14 or newer)
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/pacoreyes/pacoreyes.de.git
   cd pacoreyes.de
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following content:
   ```
   GOOGLE_TAG_ID=your-google-tag-id
   ```
   Replace `your-google-tag-id` with your actual Google Analytics tag ID.

4. Start the development server:
   ```bash
   npm start
   ```
   This will start a local server at http://localhost:8080

### Build

To build the site for production:

```bash
npm run build
```

## Deployment

### Setting Environment Variables

Before deploying, ensure that the required environment variables are set in your production environment:

1. For Firebase Hosting, you can set environment variables using Firebase Functions environment configuration:
   ```bash
   firebase functions:config:set analytics.google_tag_id="your-google-tag-id"
   ```

2. Alternatively, you can set the environment variable directly in your CI/CD pipeline or hosting platform.

### Deploy to Firebase

After building the site:

```bash
firebase deploy
```

## Code Quality

Maintain code quality with:

```bash
npm run quality
```

This runs linting and formatting checks on the codebase.

## SEO Strategy

The website implements a comprehensive SEO strategy with a focus on multi-language support:

### Multi-language Implementation

- **Language-specific URLs**: Each language has its own URL path (`/en/`, `/de/`, `/es/`)
- **Language Prioritization**: English is set as the primary language (priority 1.0 in sitemap.xml), with German and Spanish as secondary languages
- **Default Language Redirection**: The root URL redirects to the most appropriate language based on user preferences

### SEO Features

- **Structured Data**: JSON-LD implementation for rich search results using Schema.org (Person type)
- **Meta Tags**: Comprehensive meta tags including title, description, and keywords for each language
- **Open Graph Protocol**: Social media optimization with og: tags for better sharing experience
- **Twitter Cards**: Enhanced Twitter sharing with twitter: meta tags
- **Canonical URLs**: Proper canonical URL implementation to avoid duplicate content issues
- **Hreflang Tags**: Language annotations for international SEO:
  ```html
  <link rel="alternate" hreflang="x-default" href="https://www.pacoreyes.de/" />
  <link rel="alternate" hreflang="en" href="https://www.pacoreyes.de/en/" />
  <link rel="alternate" hreflang="de" href="https://www.pacoreyes.de/de/" />
  <link rel="alternate" hreflang="es" href="https://www.pacoreyes.de/es/" />
  ```
- **Sitemap.xml**: XML sitemap with language-specific URLs and priority settings
- **Robots.txt**: Controls search engine crawling behavior

### Content Strategy

- **Localized Content**: Each language version has fully translated and culturally adapted content
- **Language-specific Metadata**: Titles, descriptions, and keywords are optimized for each language
- **Consistent Structure**: All language versions maintain the same structure for better user experience

## License

ISC
