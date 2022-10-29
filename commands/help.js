const Discord = require("discord.js");
const { fanbase } = require('fantastik')
const lang = new fanbase('translations.fan')

const canvacord = require("canvacord");
const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
.setName('help')
.setNameLocalizations({
    tr: 'yardım'
})
.setDescription("Get help about the bot")
.setDescriptionLocalizations({
    tr: 'Bot hakkında yardım al!'
})
module.exports.execute = async (client, interaction) => {
    const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
    let string = server.get("language") || "en"
    

    
    interaction.reply({embeds: [
        new Discord.EmbedBuilder()
        .setDescription(eval(`lang.get("help").${string}.emb1`)).setColor("Blue")
    ]})



};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
