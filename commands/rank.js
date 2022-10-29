const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('rank')
    .setDescription("Check your own or someone else's level.")
    .setDescriptionLocalizations({
		tr: 'Kendin ya da başka birinin seviyesini gör!'
	})
    .addUserOption(option =>
		option.setName('user')
			.setDescription('Pick the user who you want to get the level of!')
            .setDescriptionLocalizations({
				tr: 'Seviyesini merak ettiğin kişiyi seç?'
			})
    )

    module.exports.execute = async (client, interaction) => {
    

        const member = interaction.options.getUser('user');
        const users = new fanbase(`data/users/${interaction.guild.id}XP.fan`)
        const usersX = new fanbase(`data/users/${interaction.guild.id}.fan`)
        let uid;
        let ui;
        if (!member) {uid = interaction.user.id} else{uid = member.id}
        if (!member) {ui = interaction.user} else{ui = member}
        let all = users.getAll()
        let attach =  ""
        const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
        let string = server.get("language") || "en"
        let bg = server.get("bg") || "https://ticari.tarkett.com.tr/media/img/M/THH_25121916_25131916_25126916_25136916_001.jpg"
        let color = server.get("color") || "#FFFFFF"
                
   let a = usersX.get(ui.id + "_lvl") || 0
   let b = a + 1 + a
   let c = b * 100

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
  var last = item.indexOf(uid) + 1 | 0


       await interaction.deferReply()
    const rank = new canvacord.Rank()
    .setAvatar(ui.avatarURL())
    .setCurrentXP(users.get(ui.id) || 0, color)
    .setRequiredXP(c, color)
    .setBackground("IMAGE", bg)
    .setProgressBar(color, "COLOR")
    .setUsername(ui.username, color)
    .setRank(last)
    .setLevel(a)
    .setLevelColor(color)
    .setRankColor(color)
    .setCustomStatusColor(color)
    .setDiscriminator(ui.discriminator, color);

try {rank.build() .then(data => {
    attach = new Discord.AttachmentBuilder(data, { name: 'server.png' })

    interaction.editReply({files: [attach], content: eval(`lang.get("rank").${string}.disclaimer`)});
});
} catch {
    interaction.editReply({files: [attach], content: eval(`lang.get("rank").${string}.invalid`)});

}
   

};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
