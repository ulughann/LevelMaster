const Discord = require("discord.js");


module.exports = async (client) => {
    await client.user.setPresence({ 
    activities: [{
    name: client.user.username + 'You guys chat', type: Discord.ActivityType.Watching }],
    afk: false
         });

};
