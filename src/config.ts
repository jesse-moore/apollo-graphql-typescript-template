/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env.production' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.dev' });
} else if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test.local' });
}

const config = {
  SERVER_PORT: process.env.SERVER_PORT || 4000,
};

export default config;
