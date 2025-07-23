import fs from "fs";

{
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides a list of available commands.'),
    async execute(interaction) {


        let helpEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle("Available Commands")
        .setAuthor("Volta Help")
        .setDescription("Here is a list of the available commands!")
        

        let cmdFiles = fs.readdirSync("Coammnds");
        let commands = [];
        cmdFiles.forEach(cmd => {
            helpEmbed.addFields(cmd.name, cmd.description)
        });

        interaction.reply({
            content: helpEmbed,
            ephemeral: true})
        }
    }
}