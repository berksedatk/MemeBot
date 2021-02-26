const Starboard = require("../schemas/starboard.js");
const Discord = require("discord.js");

module.exports = async (client, reaction, user) => {
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  let guild = reaction.message.guild;
  if (!guild) return null;
  if (reaction._emoji.toString() != "⭐") return;
  Starboard.findOne({ userID: reaction.message.author.id }, (err, sb) => {
    if (err) console.log("An error occured: " + err);
    if (!sb) {
      sb = new Starboard({
        userID: reaction.message.author.id,
        username: reaction.message.author.tag,
        stars: reaction.count
      });
    } else {
      sb.stars++;
    }
    if (reaction.count >= 5) {
      client.channels.cache.get("793483546689273856").send(new Discord.MessageEmbed()
    .setAuthor(reaction.message.author.tag, reaction.message.author.avatarURL())
    .setDescription(`Reached ${reaction.count} :star:!`)
    .addField("Message", `[Jump to message](https://discord.com/channels/${reaction.message.guild.id}}/${reaction.message.channel.id}/${reaction.message.channel.id})\n${reaction.message.content}`)
    .addField("Attachments", reaction.message.attachments.first() ? reaction.message.attachments.first() : "None")
    .setTimestamp()
    .setColor("GOLD"))
    }
    sb.save().then(() => console.log(`${reaction.message.author.tag} gained ${sb.stars} star with their ${reaction.message.id} message.`))
  });
}
