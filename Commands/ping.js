import pkg from "discord.js";
const { SlashCommandBuilder, EmbedBuilder, InteractionResponseFlags } = pkg;
export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong lol'),
    async execute(interaction) {
        interaction.reply("Pong.")
    }
}