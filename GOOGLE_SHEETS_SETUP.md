# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration for the Unlisted Shares data.

## Step 1: Prepare Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1BXYOY6k2m-TEQqAv7COwu9uQEj7DFjzIqgKquH4ooQ8/edit?usp=sharing

2. Make sure your sheet has the following columns in this exact order:
   - Column A: Logo Path (e.g., `/nse-logo.png`)
   - Column B: Company Name (e.g., `NSE India`)
   - Column C: Category (e.g., `Unlisted`, `Delisted`, `Pre IPO`)
   - Column D: Lot Size (e.g., `100`)
   - Column E: Sector (e.g., `Financial Service`)
   - Column F: Price (e.g., `2400.00`)
   - Column G: Market Cap (e.g., `574200.000`)
   - Column H: Chart Image Path (e.g., `/charts/nse-chart.svg`)

3. Make sure the first row contains headers and your data starts from row 2.

4. **Important**: Make your sheet publicly viewable:
   - Click "Share" button
   - Change access to "Anyone with the link can view"
   - Click "Done"

## Step 2: Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)

2. Create a new project or select an existing one

3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

4. Create an API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

5. Restrict the API Key (recommended for security):
   - Click on your API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Sheets API" from the list
   - Save the changes

## Step 3: Configure Your Application

1. Open the `.env.local` file in your project root

2. Replace `your_google_sheets_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=AIzaSyC-your-actual-api-key-here
   ```

3. Save the file

4. Restart your development server:
   ```bash
   npm run dev
   ```

## Step 4: Update Sheet Name (if needed)

If your sheet tab is not named "Sheet1", update the `SHEET_NAME` constant in `src/components/UnlistedShares.jsx`:

```javascript
const SHEET_NAME = 'YourSheetTabName'; // Change this to match your sheet tab name
```

## Example Sheet Structure

| Logo Path | Company Name | Category | Lot Size | Sector | Price | Market Cap | Chart Image |
|-----------|--------------|----------|----------|--------|-------|------------|-------------|
| /nse-logo.png | NSE India | Unlisted | 100 | Financial Service | 2400.00 | 574200.000 | /charts/nse-chart.svg |
| /tata-capital-logo.png | Tata Capital | Unlisted | 100 | Investment & Holding | 1040.00 | 385117.660 | /charts/tata-chart.svg |

## Troubleshooting

### Common Issues:

1. **"No data found in the sheet"**
   - Make sure your sheet is publicly viewable
   - Check that you have data starting from row 2
   - Verify the sheet name matches the `SHEET_NAME` constant

2. **"HTTP error! status: 403"**
   - Your API key might not have access to Google Sheets API
   - Make sure you've enabled Google Sheets API in your Google Cloud project
   - Check that your sheet is publicly viewable

3. **"API key not found"**
   - Make sure you've added the API key to `.env.local`
   - Restart your development server after adding the API key
   - Check that the environment variable name is correct: `NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY`

### Fallback Data

If the Google Sheets integration fails, the application will automatically use fallback data so your site continues to work. You'll see a warning in the browser console if this happens.

## Security Notes

- Never commit your `.env.local` file to version control
- The API key is prefixed with `NEXT_PUBLIC_` which means it will be visible in the browser
- For production, consider using server-side API calls for better security
- Regularly rotate your API keys for security
