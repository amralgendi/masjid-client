const Constants = {
  domain:
    process.env.NODE_ENV == "development"
      ? "hello.localhost:3000"
      : process.env.DOMAIN,
  apiBase: "https://api.masjid.net",
};

export default Constants;
