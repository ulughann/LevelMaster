const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('set-background-image')
    .setNameLocalizations({
		tr: 'arkaplan-ayarla'
	})
    .setDescription("Change the wallpaper of a rank-card in your server.")
    .setDescriptionLocalizations({
		tr: 'Sunucundaki rank-kartının arka planını değiştir!'
	})
    .addStringOption(option =>
		option.setName('background')
            .setRequired(true)
			.setDescription('A link that ends in .png / .jpg for your background')
            .setDescriptionLocalizations({
				tr: 'Arkaplan için .jpg ya da .png ile biten bir link'
			}))
            .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageChannels);

    module.exports.execute = async (client, interaction) => {
        const bg = interaction.options.getString('background');
        const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
        let string = server.get("language") || "en"

        function isImage(url) {
            return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
          }

          if (!isImage(bg)) {
            let str =   eval(`lang.get("background").${string}.fail`)
            const emb = new Discord.EmbedBuilder()
            .setDescription(str)
            .setColor("Red")
            .setTimestamp()
          
   
           return interaction.reply({embeds: [emb]})   
               }


            server.write("bg", bg)
            let str =   eval(`lang.get("background").${string}.success`)
            const emb = new Discord.EmbedBuilder()
            .setDescription(str)
            .setColor("Green")
            .setTimestamp()
          
   
           return interaction.reply({embeds: [emb]})  




};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
