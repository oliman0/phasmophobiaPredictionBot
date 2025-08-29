export async function recordVote(interaction, context, vote) {
    const prediction = context.predictions.get(interaction.guildId);
    if (prediction == undefined) {
        await interaction.reply({ content: 'There is no active prediction in this server.', ephemeral: true });
        return false;
    }

    if (prediction.users.has(interaction.user.id)) {
        await interaction.reply({ content: 'You have already voted in this prediction.', ephemeral: true });
        return false;
    } 

    if (prediction.predictionOpen === false) {
        await interaction.reply({ content: 'Prediction is closed. No further votes are accepted.', ephemeral: true });
        return false;
    }

    prediction.users.set(interaction.user.id, vote);

    return true;
}