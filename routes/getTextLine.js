const Router = require("koa-router");
const router = new Router();
const MainChangeCoins = require("../controller/getTextLine");

router.post("/webhook", MainChangeCoins);

module.exports = router;
