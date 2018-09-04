// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  rootUrl: 'http://localhost:4200',
  version1: 'api/v1',
  encriptionKey: 'onozorgheneho1',
  cloud_name: 'sportbay-co', // from https://cloudinary.com/console
  api_key: '196782493197544', // from https://cloudinary.com/console
  unsigned_preset: 'yourpreset'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
