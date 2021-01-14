# Tides

## Version 2.0

Second version of the tides app, following the removal of the tidal measurement station from the Seaport location.

## API URLs and Keys

The URL path and station ID are provided to the app via a simple export from a constants.js file (git-ignored for security). Newer versions of the API require a token however I'm still using the older version here. The format of the constants.js file is:

```javascript
const baseUrl = '<url base>';
const stationId = '<seven digit station ID>';

export {
  baseUrl,
  stationId
};
```

These will be moved to .env in the future.

Because we're using import/export here, you will need to set up a simple static server. I use parcel here during development but you can also use `http-server`.
