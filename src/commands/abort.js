import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('abort')
    .setDescription('Deletes the current prediction.');

export async function execute(interaction, context) {
    const prediction = context.predictions.get(interaction.guildId);
    if (prediction == undefined) {
        await interaction.reply({ content: 'There is no active prediction in this server.', ephemeral: true });
        return;
    }

    context.predictions.delete(interaction.guildId);

    await interaction.reply({
        embeds: [
            {
                title: 'Prediction Aborted!',
                description: 'The current prediction has been deleted.',
                color: 0xFF0000
            }
        ],
        ephemeral: true
    });
}