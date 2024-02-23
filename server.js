// require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

// const DB_HOST = "mongodb+srv://Maryna:jT5X0PMwsIaPNz8o@cluster0.5mowdde.mongodb.net/Filmoteka?retryWrites=true&w=majority&appName=Cluster0";

const { PORT = 3000, DB_HOST } = process.env;

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
