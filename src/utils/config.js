const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    address: process.env.MAIL_ADDRESS,
    password: process.env.MAIL_PASSWORD,
  },
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
  },
};

module.exports = config;
