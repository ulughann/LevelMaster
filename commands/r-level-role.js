const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('remove-level-roles')
    .setNameLocalizations({
		tr: 'seviye-rol-sil'
	})
    .setDescription("remove level roles")
    .setDescriptionLocalizations({
		tr: 'Bir seviye rolü sil'
	})
    .addNumberOption(option =>
		option.setName('level')
            .setRequired(true)
			.setDescription('the level in which a role was given')
            .setDescriptionLocalizations({
				tr: 'silinecek rolün verildii seviye'
			}))
            .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageChannels);

    module.exports.execute = async (client, interaction) => {
        const level = interaction.options.getNumber('level');
        const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
        const server2 = new fanbase(`data/levelroles/${interaction.guild.id}.fan`)
        let string = server.get("language") || "en"


        server2.remove(level)
        let str =   eval(`lang.get("max-xp").${string}.a`)
        let str2 =   eval(`lang.get("max-xp").${string}.b`)
        const emb = new Discord.EmbedBuilder()
        .setDescription(str)
        .addFields({
            name: `level: ${level}`
        })
        .setColor("Red")
        .setFooter({
            text: str2
        })
        .setTimestamp()
      

       return interaction.reply({embeds: [emb]})  





};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
