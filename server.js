require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

// console.log(process.env);

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening to port ${port}`));
