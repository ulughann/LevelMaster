const Discord = require("discord.js");

const { fanbase } = require("fantastik")
const ms = require("ms");
const fs = require('fs');

const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('istatistikler')
    .setDescription("Statistics for the bot.")

    module.exports.execute = async (client, interaction) => {
let arr = [];
let str = ``;
        let dbsize = Number(fs.readdirSync('./data').length) + Number(fs.readdirSync('./data/levelroles').length) + Number(fs.readdirSync('./data/servers').length) + Number(fs.readdirSync('./data/users').length)

        if (interaction.user.id == "1002526468359864440") {
            client.guilds.cache.forEach(guild => {
                arr.push({name: guild.name, user: guild.memberCount})
               })
               
              let sortedObjs1 = arr.sort(function (a, b) {
                return a.user - b.user;
              });
    
              let sortedObjs =sortedObjs1.reverse()
              
    
               sortedObjs.forEach((a, b)=> {
                str += `${b}: \`${a.name}: ${a.user}\`, \n`
               })
    
    

            let emb = new Discord.EmbedBuilder()
            .setTitle("ANANIN Admin Panel")
            .setDescription(`
        **🐏 Ram Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
        **🕐 Uptime:** ${ms(client.uptime)}
        **🐌 Latency:** ${client.ws.ping}ms
        
        **👥 Users:** ${client.guilds.cache.reduce((a,b)=> a + b.memberCount, 0)}
        **🏘️ Servers:** ${client.guilds.cache.size}
        **📁 Database Size:** ${dbsize}

        **🛰️ Servers:**
        ${str}
        `)
        
        
           return interaction.reply({embeds: [emb], ephemeral: true})
        }



        let emb = new Discord.EmbedBuilder()
        .setTitle("Stats for LevelMaster")
        .setDescription(`
        **🐏 Ram Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
        **🕐 Uptime:** ${ms(client.uptime)}
        **🐌 Latency:** ${client.ws.ping}ms
        
        **👥 Users:** ${client.guilds.cache.reduce((a,b)=> a + b.memberCount, 0)}
        **🏘️ Servers:** ${client.guilds.cache.size}
        **📁 Database Size:** ${dbsize}

    `)
    
    
        interaction.reply({embeds: [emb]})
};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
