export const root =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_DOMAIN
    : 'http://localhost:4000';
