const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('set-levelup-channel')
    .setNameLocalizations({
		tr: 'seviye-mesaj-kanalı'
	})
    .setDescription("Change the level message channel")
    .setDescriptionLocalizations({
		tr: 'Seviye mesaj kanalını değiştir'
	})
                .addChannelOption(option =>
                option.setName('channel')
                    .setRequired(false)
                    .setDescription('channel. Leve blank to send reply in the same channel as the message')
                    .setDescriptionLocalizations({
                        tr: 'Kanal. Boş bırakırsanız mesajın atıldığı kanalda atılır.'
                    }))
            .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageChannels);

    module.exports.execute = async (client, interaction) => {
        const channel = interaction.options.getChannel('channel');
        const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
        let string = server.get("language") || "en"

        if (!channel) {
            server.write("channel", "none")
            let str =   eval(`lang.get("max-xp").${string}.a`)
            const emb = new Discord.EmbedBuilder()
            .setDescription(str)
            .setColor("Green")
            .setTimestamp()
          
   
           return interaction.reply({embeds: [emb]})  

        }

        server.write("channel", channel.id)
        let str =   eval(`lang.get("max-xp").${string}.a`)
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
