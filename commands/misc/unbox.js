const Discord = require("discord.js");
const Stats = require("../../schemas/stats.js");

module.exports = {
  name: "unbox",
  description: "Unboxes your limited role!",
  cooldown: 60,
  dev: true,
  execute(bot, message, args) {
    let items = [
      "587345073792876564", "588479443710902282", "591698070278897704", "596559577856606218", "598680911189508108",
      "610216776860696576", "615009100324929620", "612135250767642664", "622423504595320852", "624704663962255370",
      "620942271231033345", "626394889818603520", "627974235981217802", "629358818282700820", "627627168494649384",
      "618467772434874389", "646714050817818624", "648191111697006636", "648192572937863208", "651431781421023242",
      "657042582693740564", "657791320932352030", "662649130438492170", "665201365106032651", "666718052187897858",
      "670093429090418739", "674632446741839872", "678062562415345665", "689133046334750829", "701798890302734418",
      "705900410162118747", "723970407274643608", "749349393630756884", "754115403495768065", "758450207506694194",
      "816431917712932914"
    ]

    Stats.findOne({ epic: true }, (err, stats) => {
      if (err) return message.channel.send(err);
      if (stats) {
        if (!stats.users.get(message.author.id)) {
          stats.users.set(message.author.id, {
            userID: message.author.id,
            username: message.author.tag,
            claimed: true
          })
        } else {
          if (stats.users.get(message.author.id).claimed) return message.channel.send("You already claimed your free role!");
        }

        let item = items[Math.floor(Math.random() * items.length)];
        while (message.member.roles.cache.has(item)) {
          item = items[Math.floor(Math.random() * items.length)];
        }

        if (item === "816431917712932914") {
          item = items[Math.floor(Math.random() * items.length)];
          if (item === "816431917712932914") {
            return message.member.roles.add(items[35], {reason: `They won it!!`}).then(() => {
              message.channel.send({embed:{color: "GOLD", description: `Congrats!! You got the super rare role <@&${items[35]}>!` }})
              if (stats.roles.get(items[35])) {
                let count = stats.roles.get(items[35]).count ++;
                stats.roles.set(items[35], {
                  count: count
                });
              }
              stats.save()
            });
          }
        }
        //message.member.roles.add(item, {reason: `They won it`}).then(() => {});

        message.channel.send({embed:{color: "PURPLE", description: `You unboxed the <@&${item}> role!` }});
        if (stats.roles.get(item)) {
          let count = stats.roles.get(item).count ++;
          stats.roles.set(item, {
            count: count
          });
        } else {
          stats.roles.set(item, {
            count: 1
          });
        }

        stats.users.set(message.author.id, {
          userID: message.author.id,
          username: message.author.tag,
          claimed: true
        })
        stats.save()
      }

      if (!stats) {
        stats = new Stats({
          epic: true,
          users: new Map(),
          roles: new Map()
        })
        stats.save().then(() => console.log("test")).catch(err => console.log(err))
      }
    })
  }
};
