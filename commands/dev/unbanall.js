const Discord = require("discord.js");

module.exports = {
  name: "unbanall",
  category: "Dev",
  description: "Unban all members",
  cooldown: 5,
  dev: true,
  unstaged: true,
  async execute(bot, message, args) {
    let count = 0;
    let total = 0;
    await message.guild.bans.fetch().then(async bans => {
        total = bans.size()
        await bans.forEach(async ban => {
            await message.guild.members.unban(ban.id).then(() => {
                console.log("Unbanned " + ban.id);
                count++;
            }).catch(err => {
                console.log("Could not unban " + ban.id);
                message.channel.send("Could not unban " + ban.id);
            });
        });
    });
    message.channel.send("Unbanned" + count + "out of" + total + "members");
  }
};