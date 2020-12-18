# Tides

## Version 2.0

Second version of the tides app, following the removal of the tidal measurement station from the Seaport location.

## API URLs and Keys

The URL path and token are provided to the app via a simple export from a constants.js file (git-ignored for security). The format of the constants.js file is:

```javascript
const baseUrl = <API URL is provided by noaa.gov>;
const token = <grab a token string from noaa.gov and add it here>;
...
export { key };
```

These will be moved to .env in the future.

Because we're using import/export here, you will need to set up a simple static server. I use parcel here during development but you can also use `http-server`.
