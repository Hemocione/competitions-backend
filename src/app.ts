import express from "express";
import loader from "./loaders";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const PORT = process.env.PORT || process.env.SERVER_PORT || 8080;

const end = loader({
  expressApp: app,
  isTest: process.env.ENV === "test" ? true : false,
})
  .then(() => {
    console.log("Loader Finished");
    return app.listen(PORT, () =>
      console.log(`Server Running on Port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log(`Loader Failed err: ${err}`);
  });

export default { server: app, end };
