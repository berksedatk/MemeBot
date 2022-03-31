const Discord = require("discord.js");

module.exports = {
  name: "ununfunny",
  category: "General",
  description: "Ununfunny yourself!",
  cooldown: 120,
  execute(bot, message, args) {
    let roll = Math.floor(Math.random() * 10);
    if (message.channel.id == "955477818022715442" && message.member.roles.cache.has("955854711112728576")) {
        if (roll == 1) {
            message.member.roles.add("956020022675923005").then(() => {
                message.member.roles.remove("955854711112728576").then(() => {
                  message.channel.send(`<@${message.author}> escaped unfunny jail.`);
                })
            });
        } else {
            message.channel.send(`<@${message.author}> No lmao`);
        }
    }
    message.delete();
  }
};
