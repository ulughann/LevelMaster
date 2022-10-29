const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('set-max-xp')
    .setNameLocalizations({
		tr: 'azami-xp-ayarla'
	})
    .setDescription("Change the maximum amount of xp/message on a specific channel")
    .setDescriptionLocalizations({
		tr: 'Belirli bir kanalda, 1 mesaj için verilecek maksimum xp\'yi ayarlar'
	})
    .addNumberOption(option =>
		option.setName('xp')
            .setRequired(true)
			.setDescription('the maximum xp per message')
            .setDescriptionLocalizations({
				tr: 'Mesaj başı maksimum xp'
			}))
            .addChannelOption(option =>
                option.setName('channel')
                    .setRequired(false)
                    .setDescription('channel, leave blank for all.')
                    .setDescriptionLocalizations({
                        tr: 'Kanal, hepsini seçmek için boş bırak.'
                    }))
            .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageChannels);

    module.exports.execute = async (client, interaction) => {
        const xp = interaction.options.getNumber('xp');
        const channel = interaction.options.getChannel('channel');
        const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
        let string = server.get("language") || "en"

    
        if (!channel) {
            interaction.guild.channels.cache.forEach((channel) => {
                server.write(channel.id, xp)
               });
               
            let str =   eval(`lang.get("max-xp").${string}.a`)
            const emb = new Discord.EmbedBuilder()
            .setDescription(str)
            .setColor("Green")
            .setTimestamp()
          
   
           return interaction.reply({embeds: [emb]})  

        }

        server.write(channel.id, xp)
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
