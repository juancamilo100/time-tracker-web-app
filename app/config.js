export const routePath = {
  featuresPath: `/main/report`,
  loginPath: `/login`,
  mainPath: `/main`,
  profilePath: `/main/profileInfo`,
  reportHistoryPath: `/main/reportHistory`,
};

// tslint:disable-next-line:no-console
// console.log("base URL:");
//tslint:disable-next-line:no-console
console.log(process.env);

export const TIME_TRACKER_API_BASE_URL = process.env.TIME_TRACKER_API_BASE_URL;
export const TIME_TRACKER_API_PORT = process.env.TIME_TRACKER_API_PORT;
