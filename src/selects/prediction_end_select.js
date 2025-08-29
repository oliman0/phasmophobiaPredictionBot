export const data = {
    name: 'prediction_end_select'
}

export async function execute(interaction, context) {
    const ghostType = interaction.values[0];
    const prediction = context.predictions.get(interaction.guildId);
    if (prediction == undefined) {
        await interaction.reply({ content: 'There is no active prediction in this server.', ephemeral: true });
        return;
    }

    if (prediction.predictionOpen === true) {
        await interaction.reply({ content: 'Prediction is still open. Please close the prediction before ending it.', ephemeral: true });
        return;
    }

    const correctVoters = [];

    if (prediction.predictionType === 0) { // Yes/No
        for (const [userId, userGuess] of prediction.users.entries()) {
            if (userGuess == (ghostType == prediction.ghost)) {
                correctVoters.push(`<@${userId}>`);
            }
        }
    } else if (prediction.predictionType === 1) { // Blind Guess
        for (const [userId, userGuess] of prediction.users.entries()) {
            if (userGuess == ghostType) {
                correctVoters.push(`<@${userId}>`);
            }
        }
    }
    const correctVotersMessage = correctVoters.length > 0 ? correctVoters.join(', ') + ' guessed **correctly**!' : 'No one guessed correctly this time :<';

    context.predictions.delete(interaction.guildId);

    await interaction.reply({ 
        embeds: [
            {
                title: 'Prediction Ended!',
                description: `The ghost was: **${context.ghosts[ghostType]}**.` + `\n\n${correctVotersMessage}`,
                color: 0x00B2FF
            }
        ]
    });
}