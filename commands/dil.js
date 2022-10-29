const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('set-language')
	.setNameLocalizations({
		tr: 'dil-ayarla'
	})
    .setDescription("Set a specific language for the bot.")
    .setDescriptionLocalizations({
		tr: 'Ayarlanacak bir dil seç!'
	})
    .addStringOption(option =>
		option.setName('language')
			.setDescription('Pick the language to be used on your server!')
            .setDescriptionLocalizations({
				tr: 'Hangi dil kullanılmalı?'
			})
			.setRequired(true)
            .addChoices(
				{ name: 'Türkçe (TR)', value: 'tr' },
				{ name: 'English (EN)', value: 'en' }
            ))
            .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageChannels);

    module.exports.execute = async (client, interaction) => {
        const string = interaction.options.getString('language');
        const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
        

        if(server.get("language") == string) {
         let str =   eval(`lang.get("set-language").${string}.no_change`)
         const emb = new Discord.EmbedBuilder()
         .setDescription(str)
         .setColor("Orange")
         .setTimestamp()
         .setFooter({
            text: eval(`lang.get("set-language").${string}.footer`)
        })
       

        return interaction.reply({embeds: [emb]})
        }

        let str =   eval(`lang.get("set-language").${string}.success`)
        const emb = new Discord.EmbedBuilder()
        .setDescription(str)
        .setColor("Green")
        .setTimestamp()
        .setFooter({
            text: eval(`lang.get("set-language").${string}.footer`)
        })
       
        interaction.reply({embeds: [emb]})
        server.write("language", string)
        



};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
