console.log(process.env.DOMAIN);
console.log(process.env.API_BASE);

const Constants = {
  host:
    process.env.NODE_ENV == "development"
      ? "hello.localhost"
      : process.env.DOMAIN,
  domain:
    process.env.NODE_ENV == "development"
      ? "hello.localhost:3000"
      : process.env.DOMAIN,
  apiBase: process.env.API_BASE,
};

export default Constants;
