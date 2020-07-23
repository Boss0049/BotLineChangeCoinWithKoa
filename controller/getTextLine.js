const axios = require("axios");

const changeCoins = async (req, res) => {
  const messageCoins = await axios.get(
    "http://data.fixer.io/api/latest?access_key= input_key_token_fixer"
  );
  return messageCoins.data;
};

const MainChangeCoins = async (ctx) => {
  const message = await changeCoins();

  let THB = Math.ceil(
    `${message.rates.THB * ctx.request.body.events[0].message.text}`
  );

  if (isNaN(THB)) {
    THB = "กรุณากรอกเป็นตัวเลข";
  }

  let token = ctx.request.body.events[0].replyToken;

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer input_token_line",
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
