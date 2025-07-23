import pkg from "discord.js";
const { SlashCommandBuilder, EmbedBuilder, InteractionResponseFlags } = pkg;
export default {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn a user."),
    async execute(interaction) {
        interaction.reply("Warn.")
    }
}