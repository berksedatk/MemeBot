const fs = require("fs");
const { prefix } = require("./config.json");
require('dotenv').config();

//Discord
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
  disableMentions: "everyone",
  messageCacheMaxSize: 35,
  messageCacheLifetime: 30,
  messageSweepInterval: 60
}, {
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
}, {
  intents: [
    Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES
  ]
});

client.commands = new Collection();
client.events = new Collection();

["commands","events"].forEach(handler => {
  require(`./handlers/${handler}.js`)(client);
});

client.login(process.env.BOT_TOKEN);
