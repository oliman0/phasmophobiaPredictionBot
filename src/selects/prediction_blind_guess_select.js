import { recordVote } from "../recordVote.js";

export const data = {
    name: 'prediction_blind_guess_select'
}

export async function execute(interaction, context) {
    if (!(await recordVote(interaction, context, interaction.values[0]))) return;

    const prediction = context.predictions.get(interaction.guildId);

    await interaction.reply({
        embeds: [
            {
                title: 'Vote Recorded!',
                description: `${interaction.user.displayName} voted for the ghost being **${context.ghosts[interaction.values[0]]}**.`,
                color: 0x00B2FF
            }
        ]
    });
}