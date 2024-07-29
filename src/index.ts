import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});

const MONGO_URI =
  "mongodb+srv://vathithyaramaa:athithya1@athithyacluster.kalkczt.mongodb.net/?retryWrites=true&w=majority&appName=AthithyaCluster";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (error: Error) => {
  console.error(error);
});

app.use('/', router());