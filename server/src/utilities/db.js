const mongoose = require ('mongoose');

const connect = (mongodbURL,port) => {
  try {
    mongoose
      .connect(mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(()=>console.log(`Connected to MongoDB Successfully... listening to port ${port}`));
  } catch (e) {
    console.error (`Couldn't connect to database, Error: ${e}`);
  }
};

module.exports = connect;
