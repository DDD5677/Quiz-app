const { Bot } = require("grammy");
const TOKEN = process.env.TOKEN;
const bot = new Bot(TOKEN);
const User = require("../models/user");
bot.command("start", async (ctx) => {
   const telegramId = ctx.message.chat.id;
   const userId = ctx.match;
   let user;
   if (userId) {
      user = await User.findByIdAndUpdate(
         userId,
         { telegramId: telegramId },
         { new: true }
      );
      return ctx.reply(`${user.firstname} ${user.lastname} is subscribed!`);
   }
   ctx.reply("Welcome to EasyQuiz bot!");
});
bot.on("message", (ctx) =>
   ctx.reply("This bot is only for teachers of EasyQuiz.")
);
module.exports = bot;
