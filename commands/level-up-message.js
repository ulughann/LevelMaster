const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('set-level-up-message')
    .setNameLocalizations({
		tr: 'seviye-mesajı-ayarla'
	})
    .setDescription("Change the level up message for your server")
    .setDescriptionLocalizations({
		tr: 'Sunucunuzdaki seviye atlama mesajını değiştirin'
	})
.setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageChannels);

    module.exports.execute = async (client, interaction) => {
        const color = interaction.options.getString('color');
        const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
        let string = server.get("language") || "en"
        let text = server.get("levelUp") || eval(`lang.get("level").${string}.levelup`)
        const modal = new Discord.ModalBuilder()
			.setCustomId('msg')
			.setTitle('New level-up message');

            const favoriteColorInput = new Discord.TextInputBuilder()
			.setCustomId('favoriteColorInput')
			.setLabel("+lvl : new level, +mention : user mention")
            .setValue(`${text}`)
            .setRequired(true)
            .setMaxLength(100)
            .setStyle(Discord.TextInputStyle.Paragraph)
            .setMinLength(5);





            const firstActionRow = new Discord.ActionRowBuilder().addComponents(favoriteColorInput);
            modal.addComponents(firstActionRow);

            await interaction.showModal(modal);
            interaction.reply({content: "..........", ephemeral: true})



};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
