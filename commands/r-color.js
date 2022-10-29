const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('set-text-color')
    .setNameLocalizations({
		tr: 'renk-ayarla'
	})
    .setDescription("Change the text colors of a rank-card in your server.")
    .setDescriptionLocalizations({
		tr: 'Sunucundaki rank-kartının yazı rengini değiştir!'
	})
    .addStringOption(option =>
		option.setName('color')
            .setRequired(true)
			.setDescription('One of the colors may be choosen')
            .setDescriptionLocalizations({
				tr: 'Renklerden bir tanesi seçilebilir.'
			})
            .addChoices(
				{ name: 'White', value: '#FFFFFF', name_localizations: {tr: 'Beyaz'} },
				{ name: 'Red', value: '#FF0000', name_localizations: {tr: 'Kırmızı'} },
				{ name: 'Blue', value: '#0000FF', name_localizations: {tr: 'Mavi'} },
				{ name: 'Magenta', value: '#FF00FF', name_localizations: {tr: 'Magenta'} },
				{ name: 'Green', value: '#00FF00', name_localizations: {tr: 'Yeşil'} },
				{ name: 'Purple', value: '#800080', name_localizations: {tr: 'Mor'} },
				{ name: 'Cyan', value: '#00FFFF', name_localizations: {tr: 'Turkuaz'} },
				{ name: 'Black', value: '#000000', name_localizations: {tr: 'Siyah'} }
            ))
            .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageChannels);

    module.exports.execute = async (client, interaction) => {
        const color = interaction.options.getString('color');
        const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
        let string = server.get("language") || "en"



            server.write("color", color)
            let str =   eval(`lang.get("set-color").${string}.success`)
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
