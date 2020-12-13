# Tides
## Version 2.0

Second version of the tides app, following the removal of the tidal measurement station from the Seaport location.

## Key
The key is provided to the app via a simple export from a constants.js file (git-ignored for security). The format of the constants.js file is:

```javascript
const key = <grab a key string from noaa.gov and add it here>;
export { key };
```

Because we're using import/export here, you will need to set up a simple static server. I use parcel here during development but you can also use `http-server`.