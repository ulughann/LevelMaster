const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('level-roles')
    .setNameLocalizations({
		tr: 'seviye-rolleri'
	})
    .setDescription("Check the level roles that exist in your server.")
    .setDescriptionLocalizations({
		tr: 'Sunucundaki seviye rollerini gözden geçirin'
	})
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageChannels);

    module.exports.execute = async (client, interaction) => {
        const server2 = new fanbase(`data/levelroles/${interaction.guild.id}.fan`)

        let o = server2.getAll()
        let str = "";

        Object.keys(o).sort(function(a,b){return o[a]-o[b]}).reverse().forEach((key, index) => { 
            str += `level ${key}: <@&${o[key]}>\n`
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
