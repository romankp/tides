# Tides

## Version 2.0

Second version of the tides app, following the removal of the tidal measurement station from the Seaport location.

## API URL, ID, and Keys

The URL path and station ID are provided to the app via a .env file (git-ignored for security). Newer versions of the API require a token however I'm still using the older version here. The variable format of the .env file is:

```env
BASE_URL='<url base>'
STATION_ID='<seven digit station ID>'
```

Parcel caches these values, so changing them while it's running while not immediately update them in localhost. You will need to run `npm install` from root to update the cache.
