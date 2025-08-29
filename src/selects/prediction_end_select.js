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

    const correctVotersNames = [];
    const correntVotersIDs = [];

    if (prediction.predictionType === 0) { // Yes/No
        for (const [userId, userGuess] of prediction.users.entries()) {
            if (userGuess == (ghostType == prediction.ghost)) {
                correctVotersNames.push(`<@${userId}>`);
                correntVotersIDs.push(userId);
            }
        }
    } else if (prediction.predictionType === 1) { // Blind Guess
        for (const [userId, userGuess] of prediction.users.entries()) {
            if (userGuess == ghostType) {
                correctVotersNames.push(`<@${userId}>`);
                correntVotersIDs.push(userId);
            }
        }
    }
    const correctVotersMessage = correctVotersNames.length > 0 ? correctVotersNames.join(', ') + ' guessed **correctly**!' : 'No one guessed correctly this time :<';

    for (const userId of correntVotersIDs) {
        const userRecord = await context.usersCollection.findOne({ discordId: userId });
        if (userRecord == null) {
            await context.usersCollection.insertOne({ discordId: userId, points: 0 });
        }

        await context.usersCollection.updateOne(
            { discordId: userId },
            { $inc: { points: 1 } }
        );
    }

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