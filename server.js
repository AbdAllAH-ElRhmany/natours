const mongoose = require('mongoose');
const dotenv = require('dotenv');

// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message);
//   console.log('UNHANDLER EXCEPTION!! Shutting down...');
//   process.exit(1);
// });

dotenv.config({ path: './config.env' });
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((con) => {
    // console.log(con);
    console.log('DB Connected Successfly');
  })
  .catch((err) => console.log('Connection Error'));

const server = app.listen(port, (req, res) => {
  console.log('App running on port ' + port);
});

// process.on('unhandledRejection', (err) => {
//   // console.log(err.name, err.message);
//   // console.log('UNHANDLER REHECTION!! Shutting down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });
