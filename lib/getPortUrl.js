export const getFetchUrl = () =>
  process.env.NODE.ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
export default getFetchUrl;
