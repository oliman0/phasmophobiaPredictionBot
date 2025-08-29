import { recordVote } from "../recordVote.js";

export const data = {
    name: 'prediction_no'
}

export async function execute(interaction, context) {
    if (!(await recordVote(interaction, context, false))) return;

    const prediction = context.predictions.get(interaction.guildId);

    await interaction.reply({
        embeds: [
            {
                title: 'Vote Recorded!',
                description: `${interaction.user.displayName} voted **No** for the ghost being **${context.ghosts[prediction.ghost]}**.`,
                color: 0x00B2FF
            }
        ]
    });
}