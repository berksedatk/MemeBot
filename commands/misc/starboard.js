const Discord = require("discord.js");
const Starboard = require("../../schemas/starboard.js");

module.exports = {
  name: "starboard",
  category: "Starboard",
  description: "Shows you the top 10 of starred messages of the server.",
  aliases: ["sb"],
  cooldown: 10,
  execute(client, message, args) {
    Starboard.find({}, async (err, sbs) => {
      let top = [];
      await sbs.forEach(async sb => {
        let user = await client.users.fetch(sb.userID)
        top.push({
          user: user.tag,
          count: sb.stars
        })
      });
      top.sort((a, b) => b.count - a.count);
      let ten = top.splice(0, 9)
      console.log(ten)
      let msg = ""
      for (i = 0; i < ten.length; i++) {
        msg += `#${i + 1} ${ten[i].user} ${ten[i].count} :star:\n`
        console.log(msg)
      }
      console.log(msg)
      message.channel.send(new Discord.MessageEmbed()
      .setTitle("Top 10")
      .setDescription(msg)
      .setColor("GOLD")
      .setAuthor("Starboard", `https://cdn.discordapp.com/attachments/675713619421429761/810945954685124648/2b50.png`)
      .setTimestamp());
    });
  }
};
