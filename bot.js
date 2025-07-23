import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import fs from "fs";
import "dotenv/config";


(async () => {
  // Filter for js files in Commands folder.
  const cmdFiles = fs.readdirSync("./Commands/").filter(file => file.endsWith(".js"));
  // Create an empty array to store data.
  const commands = [];
  const commandModules = new Map();
  // forEach loop
  for (const file of cmdFiles) {
    const command = await import(`./Commands/${file}`);
    commands.push(command.default.data.toJSON());
    commandModules.set(command.default.data.name, command.default)
    console.log(`Loaded command: ${command.default.data.name}`);
  }


  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

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

    const command = commandModules.get(interaction.commandName)
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error)
      await interaction.reply("There was an error running that command....")
    }
  });

  client.login(process.env.TOKEN);
})();