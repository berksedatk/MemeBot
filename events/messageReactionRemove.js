const Starboard = require("../schemas/starboard.js");

module.exports = async (client, reaction, user) => {
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  let guild = reaction.message.guild;
  if (!guild) return null;
  if (reaction._emoji.toString() != "⭐") return;
  Starboard.findOne({ userID: reaction.message.author.id }, (err, sb) => {
    if (err) console.log("An error occured: " + err);
    if (sb) {
      sb.stars--;
      sb.save().then(() => console.log(`${reaction.message.author.tag} dropped to ${sb.stars} star with their ${reaction.message.id} message.`))
    }
  });
}
