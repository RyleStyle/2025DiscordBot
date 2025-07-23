import fs from "fs";
import pkg from "discord.js";
const { SlashCommandBuilder, EmbedBuilder, InteraionResponseFlags } = pkg;

export default {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription('Provides a list of available commands.'),
    async execute(interaction) {

        console.log("Help");

        let helpEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle("Available Commands")
        .setAuthor({name: "Volta Help"})
        .setDescription("Here is a list of the available commands!")
        

        let cmdFiles = fs.readdirSync("Commands");
        let commands = [];
        for (const file of cmdFiles) {
            const command = await import(`../Commands/${file}`);
            commands.push(command.default.data.toJSON());
            helpEmbed.addFields({ name: command.default.data.name, value: command.default.data.description })
        }

        interaction.reply({
            embeds: [helpEmbed],
            flags: 64 // ephemeral
            })
        }
    }