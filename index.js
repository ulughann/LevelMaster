const fs = require("fs");
const Path = require("path");
const Discord = require("discord.js");
const { fanbase } = require('fantastik');

const client = global.client = new Discord.Client({
    intents: 513, //please use eNums as of v14.
});
client.commands = global.commands = new Discord.Collection();
const synchronizeSlashCommands = require('command-sync');
const { getSystemErrorMap } = require("util");
// a new comment
        const eventsRegister = () => {
            let eventsDir = Path.resolve(__dirname, './birds');
            if (!fs.existsSync(eventsDir)) return console.log("I could not find an events directory. (looking to read a birds dir.)");
            fs.readdirSync(eventsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((event) => {
                let totalEventBirds = require(`./birds/${event}`);
                if (!totalEventBirds) return console.log("no event birds in the code");
                console.log(`${event} was saved.`);
                client.on(event.split('.')[0], totalEventBirds.bind(null, client));
                delete require.cache[require.resolve(`./birds/${event}`)];
            });
        };
        
        const commandsRegister = () => {
            let commandsDir = Path.resolve(__dirname, './commands');
            if (!fs.existsSync(commandsDir)) return console.log("Commands directory does not exist.");
            fs.readdirSync(commandsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((command) => {
                let cmdFile = require(`./commands/${command}`);
                if (!cmdFile) return console.log("No props.");
                console.log('\x1b[33m%s\x1b[0m', `Saved command: ${command}`);
                client.commands.set(cmdFile.options.name, cmdFile);
                delete require.cache[require.resolve(`./commands/${command}`)];
            });
        };
        
        
        
        const slashCommandsRegister = () => {
            const commands = client.commands.filter((c) => c.options);
            const fetchOptions = { debug: false };
            synchronizeSlashCommands(client, commands.map((c) => c.options), fetchOptions);
        };
        
        eventsRegister();
        commandsRegister();
        slashCommandsRegister();
        
        
        
        
        const conf = new fanbase('settings.fan')
        client.login(conf.get('token'));
        
        process.on('unhandledRejection', error => {
            console.log(error);
        });

const { maxHeaderSize } = require("http");
        const lang = new fanbase('translations.fan')

        let ms = require('ms');
const { channel } = require("diagnostics_channel");

client.on("messageCreate", async(msg) => {
    if (msg.author.bot) return;
    const server = new fanbase(`data/servers/${msg.guild.id}.fan`)
    const users = new fanbase(`data/users/${msg.guild.id}.fan`)
    const usersX = new fanbase(`data/users/${msg.guild.id}XP.fan`)

    const timeout = 60 * 1000; // 7 days in milliseconds, change to the desired cooldown time, in milliseconds
	const cooldown = users.get(`${msg.author.id}_cool`);

	if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
		const time = ms(timeout - (Date.now() - cooldown));
        return;
	} else {

    let author = msg.author.id
    if (msg.author.id == client.user.id) return;
    let xp = usersX.get(msg.author.id) || 0
    let lvl = users.get(msg.author.id + "_lvl") || 0
    let nlvl1 = lvl + 1 + lvl
    let nlvl = nlvl1 * 100
    let string = server.get("language") || "en"

   let nxp = Math.floor(Math.random() * ((server.get(msg.channel.id) || 30) - 1 + 1) + 1)
    usersX.sum(msg.author.id, nxp)
    let wtf = server.get("levelUp") || eval(`lang.get("level").${string}.levelup`)
    let wtf2 = wtf.replaceAll("+mention", `<@${msg.author.id}>`).replaceAll("+lvl", `${lvl + 1}`)
    if (usersX.get(msg.author.id) > nlvl) {
        let ch = msg.guild.channels.cache.get(msg.channelId)
        if (server.get("channel") == "none") {ch = msg.guild.channels.cache.get(msg.channelId)};
        if (server.has("channel") && server.get("channel") != "none") {ch = msg.guild.channels.cache.get(server.get("channel"))};


       // if (server.get("channel") != "none" || undefined || null) {ch = msg.guild.channels.cache.get(server.get("channel"))};
    
        ch.send(wtf2)
        users.sum(msg.author.id + "_lvl", 1)


        const server2 = new fanbase(`data/levelroles/${msg.guild.id}.fan`)
        if (server2.has(lvl + 1)) {
            let role = msg.guild.roles.cache.find(r => r.id === server2.get(lvl+1));
            let emb5 = new Discord.EmbedBuilder()
            .setDescription(eval(`lang.get("level").${string}.role`))
            .setColor("Red")
            .setImage("https://media.discordapp.net/attachments/1013405563247403038/1030508314309709916/20221014_185156.jpg?width=386&height=403")

            
            msg.member.roles.add(role).catch((e) =>{ console.log(e), msg.reply({embeds: [emb5]})});

        }
    } 
    users.write(`${msg.author.id}_cool`, Date.now());
}
})

client.on('interactionCreate', interaction => {
	if (!interaction.isModalSubmit()) return;

    const server = new fanbase(`data/servers/${interaction.guild.id}.fan`)
    let string = server.get("language") || "en"

	// Get the data entered by the user
	const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
    server.write("levelUp", favoriteColor)
    interaction.reply(eval(`lang.get("level").${string}.msg`))
});