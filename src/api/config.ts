let clientUrl: string = '';

switch (process.env.NODE_ENV) {
  case 'development':
    clientUrl = process.env.REACT_APP_CLIENT_DEV_DOMAIN!;
    break;
  case 'production':
    clientUrl = process.env.REACT_APP_CLIENT_PROD_DOMAIN!;
    break;
  default:
    clientUrl = process.env.REACT_APP_CLIENT_DEV_DOMAIN!;
}

export default clientUrl;
export const root = process.env.REACT_APP_PROD_DOMAIN;
