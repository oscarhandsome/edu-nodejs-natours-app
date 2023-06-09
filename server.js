const mongoose = require('mongoose');
const dotenv = require('dotenv');

// should be at top
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION 🔴🔴🔴 Shutting down server...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection success! 😎😎😎'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...✅✅✅`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION 🔴🔴🔴 Shutting down server...');
  // console.log(err);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
    // }, 4000);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
    // process.exit(1);
  });
});

// console.log(x);
