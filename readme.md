
# World Clock

A free, browser-based world clock that lets you explore current times across the globe, search for cities, and detect your local timezone.

**No accounts. No API keys. No subscriptions. No advertisements.**

## Features

- **Live World Clock:** View current times across different timezones.
- **All Timezones:** Access the timezones supported by your browser's internationalization API.
- **City Search:** Search for cities around the world and find their corresponding timezones.
- **Automatic Location Detection:** Detect your local timezone using your browser's location and timezone settings.
- **Manual Timezone Selection:** Choose any supported timezone manually.
- **Automatic Daylight Saving Time:** Time adjustments are handled automatically.
- **Responsive Design:** Use the clock on desktop, tablet, or mobile devices.
- **Free and Open:** No paid features, premium subscriptions, or unnecessary restrictions.

## How It Works

World Clock is designed to operate entirely through your web browser, without requiring a dedicated backend server.

### 1. Timezone Calculations

The website uses JavaScript's built-in `Intl.DateTimeFormat` API to calculate and display local times.

For example:

```javascript
const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
});

console.log(formatter.format(new Date()));
```

The browser handles timezone offsets, daylight saving time, and regional time differences automatically.

### 2. City Search

City searches use the Open-Meteo Geocoding API.

When you search for a city, the website sends a request to the geocoding service and retrieves information such as:

- City name
- Country
- Region
- Latitude and longitude
- Timezone

The returned timezone is then used to display the city's current local time.

Open-Meteo:
https://open-meteo.com/

Geocoding API:
https://open-meteo.com/en/docs/geocoding-api

### 3. Location Detection

The website can use your browser's Geolocation API to request your approximate device coordinates.

If permission is granted, the coordinates can be used to identify your location through geocoding.

Your browser also provides its configured local timezone through:

```javascript
Intl.DateTimeFormat().resolvedOptions().timeZone
```

Location access is optional. You can use the website without granting location permissions.

### 4. Daylight Saving Time

World Clock does not manually calculate daylight saving time.

Instead, it relies on the browser's location and timezone.

This means the displayed time automatically adjusts when a region enters or leaves daylight saving time.

## How to Use

### Viewing World Times

1. Open the World Clock website.
2. Browse the available timezone or city listings.
3. Find the location you want to check.
4. Read its displayed local time.

### Searching for a City

1. Find the city search field.
2. Enter a city name, such as `Tokyo`, `London`, or `New York`.
3. Select the wanted search result.
4. View its current local time.

### Detecting Your Location

1. Open the website.
2. Select the location detection option.
3. Allow your browser to access your location.
4. Your local timezone and location information can then be displayed.

You can decline the permission request and continue using the website normally.

## Technology

| Thing Used | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Clock functionality and interactions |
| Intl API | Timezone calculations and formatting |
| Geolocation API | Optional device location detection |
| Open-Meteo | City search and geocoding |

## Hosting

This project is designed to be hosted using GitHub Pages.

To deploy your own copy:

1. Fork or download this repository.
2. Make sure the website's `index.html` is in the repository's root directory.
3. Open your repository's **Settings**.
4. Navigate to **Pages**.
5. Select **Deploy from a branch**.
6. Select your preferred branch and the `/ (root)` directory.
7. Save your settings.

GitHub Pages will publish your website.

## API and Privacy

City searches require an internet connection. Previously loaded pages may still display timezone information, but external searches will not work offline.

## Extra Info

World Clock is intended to remain accessible and straightforward.

- No paywalls.
- No premium subscriptions.
- No advertisements.
- No unnecessary accounts.
- No required API keys.
- No paid backend infrastructure.

See the repository's `LICENSE` file for licensing and redistribution terms.
