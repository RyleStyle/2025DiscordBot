import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import fs from "fs";
import "dotenv/config";


// Filter for js files in Commands folder.
const cmdFiles = fs.readdirSync("./Commands/").filter(file => file.endsWith(".js"));
// Create an empty array to store data.
const commands = [];
// forEach loop
cmdFiles.forEach(file => {
  const command = require(`./Commands/${file}`);
  commands.push(command.data.toJSON());
  console.log(`Loaded command: ${command.data.name}`);
});


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.TOKEN), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}


// Register client and run.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.TOKEN);