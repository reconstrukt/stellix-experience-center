export const IS_PRODUCTION = (process.env.NEXT_PUBLIC_FORCE_ENV || process.env.NODE_ENV) === 'production';

const PROD_API_URL = 'https://stellix.reconstrukt.net/api/v1';
const PROD_API_KEY = 'iEgNqUdhBkljas99bpmoVxazQdVIsc';

const LOCAL_API_URL = 'https://stellix.reconstrukt.net/api/v1';
const LOCAL_API_KEY = 'iEgNqUdhBkljas99bpmoVxazQdVIsc';

export const API_CONFIG = IS_PRODUCTION
    ? {
          URL: PROD_API_URL,
          KEY: PROD_API_KEY,
      }
    : {
          URL: LOCAL_API_URL,
          KEY: LOCAL_API_KEY,
      };
