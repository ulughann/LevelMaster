const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('leaderboard')
    .setNameLocalizations({
		tr: 'sıralama'
	})
    .setDescription("Leaderboard of your server")
    .setDescriptionLocalizations({
		tr: 'Sunucunuzun sıralaması'
	})
    .addNumberOption(option =>
		option.setName('page')
            .setRequired(true)
			.setDescription('One of the pages may be chosen')
            .setDescriptionLocalizations({
				tr: 'Bakılacak sayfa.'
			})
            .addChoices(
				{ name: '1', value: 1},
				{ name: '2', value: 2 },
				{ name: '3', value: 3 },
				{ name: '4', value: 4},
				{ name: '5', value: 5},
            ))

    module.exports.execute = async (client, interaction) => {
        const a = interaction.options.getNumber('page');


        const users = new fanbase(`data/users/${interaction.guild.id}XP.fan`)
        const usersX = new fanbase(`data/users/${interaction.guild.id}.fan`)
        let all = users.getAll()
        const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
        let string = server.get("language") || "en"
                
function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return a.value - b.value; });
    //arr.sort(function(a, b) { return a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
    return arr; // returns array
}

var arr = sortObject(all).reverse();
var item = arr.map(function(item) {
    return item['key'];
  });


let data;
if (a == 1) {
    data = item.slice(0, 30)////.map(x => x.place_id)

}   
if (a == 2) {
    data = item.slice(30, 60)////.map(x => x.place_id)
    
}   

if (a == 3) {
    data = item.slice(60, 90)////.map(x => x.place_id)
    
}   


if (a == 4) {
    data = item.slice(90, 130)////.map(x => x.place_id)
    
} 

if (a == 5) {
    data = item.slice(130, 200)////.map(x => x.place_id)
    
} 

let str = "server leaderboard\n";

data.forEach((key, index) => { 
    str += `- ${item.indexOf(key) + 1}: <@${key}> levels: ${usersX.get(key + "_lvl") || 0}\n`
  });

  if (str == "") str = "no data"
  let emb = new Discord.EmbedBuilder()
  .setDescription(str)
  .setColor("Blue")
  interaction.reply({embeds: [emb]} )
  



};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
