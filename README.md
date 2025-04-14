# SEO Spark Automator

A comprehensive SEO and web performance analysis tool that helps you optimize your website for search engines and improve user experience.

## Features

- Core Web Vitals Analysis
- SEO Score Tracking
- Keyword Research and Analysis
- Content Optimization
- AI-Powered Recommendations
- Project Management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/seo-spark-automator.git
   cd seo-spark-automator
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_LIGHTHOUSE_API_KEY=your_lighthouse_api_key
   VITE_API_URL=http://localhost:3000
   ```

   To get a Lighthouse API key:
   1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
   2. Create a new project or select an existing one
   3. Enable the PageSpeed Insights API
   4. Create credentials (API key)
   5. Copy the API key to your `.env` file

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Core Web Vitals Analysis

1. Navigate to the "Web Vitals" page
2. Enter a URL to analyze
3. Select the device type (mobile or desktop)
4. Click "Analyze" to run the analysis
5. View the results and recommendations

### SEO Score Tracking

1. Navigate to the "Projects" page
2. Create a new project or select an existing one
3. View the SEO score and recommendations
4. Export the data for further analysis

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Google PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
