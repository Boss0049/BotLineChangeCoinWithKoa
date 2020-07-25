const Koa = require("koa");
const app = new Koa();
const BodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = require("./routes/getTextLine");

app.use(BodyParser());
app.use(cors({ origin: "*", allowMethods: ["GET", "HEAD", "POST"] }));

app.use(router.routes());

app.listen(8000, () => {
  console.log("Server is running");
});
