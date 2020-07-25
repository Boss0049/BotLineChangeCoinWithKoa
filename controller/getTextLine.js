const axios = require("axios");

const changeCoins = async (req, res) => {
  const messageCoins = await axios.get(
    "http://data.fixer.io/api/latest?access_key=bba950d832d01f83dce4f6edcfc420d7"
  );
  return messageCoins.data;
};

const MainChangeCoins = async (ctx) => {
  const message = await changeCoins();
  const replyLine = ctx.request.body.events[0].message.text.includes("USD")
    ? parseInt(ctx.request.body.events[0].message.text)
    : ctx.request.body.events[0].message.text;

  let THB = Math.ceil(
    `${message.rates.THB * Number(replyLine)}`
  );

  if (isNaN(THB)) {
    THB = "กรุณากรอกเป็นตัวเลข";
  }

  let token = ctx.request.body.events[0].replyToken;

  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer O4YUGVsfHP76flyUxc/Ftd6Sxnl4bUa3LJr9IFB3GbQdzXCaHOax7XJ6cH0dXhoq/mPun1OUu1ENZIfX41rmRIix8rfy97tbXCmRIxYAv+C2rp7YtEpxdxOO0cNnavGtc1azpcAEJGzEz/JE3pnwJwdB04t89/1O/w1cDnyilFU=",
  };

  let data = {
    replyToken: token,
    messages: [
      {
        type: "text",
        text: THB,
      },
    ],
  };

  await axios.post("https://api.line.me/v2/bot/message/reply", data, {
    headers: headers,
  });

  ctx.status = 200;
};

module.exports = MainChangeCoins;
