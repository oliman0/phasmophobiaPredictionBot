export const data = {
    name: 'prediction_close'
}

export async function execute(interaction, context) {
    const prediction = context.predictions.get(interaction.guildId);
    if (prediction == undefined) {
        await interaction.reply({ content: 'There is no active prediction in this server.', ephemeral: true });
        return;
    }

    if (prediction.predictionOpen === false) {
        await interaction.reply({ content: 'Prediction is already closed.', ephemeral: true });
        return;
    }

    prediction.predictionOpen = false;

    await interaction.reply({ 
        embeds: [
            {
                title: 'Prediction Closed!',
                description: `The prediction is now closed. No further votes will be accepted.`,
                color: 0x00B2FF
            }
        ]
    });

    await interaction.followUp({
        embeds: [
            {
                title: 'End Prediction',
                description: 'Select the ghost type to end the prediction:'
            }
        ],
        components: [
            {
                type: 1, // Action Row
                components: [
                    {
                        type: 3, // String Select
                        custom_id: 'prediction_end_select',
                        placeholder: 'Choose the ghost type...',
                        options: [
                            { label: "Spirit", value: 0 },
                            { label: "Wraith", value: 1 },
                            { label: "Phantom", value: 2 },
                            { label: "Poltergeist", value: 3 },
                            { label: "Banshee", value: 4 },
                            { label: "Jinn", value: 5 },
                            { label: "Mare", value: 6 },
                            { label: "Revenant", value: 7 },
                            { label: "Shade", value: 8 },
                            { label: "Demon", value: 9 },
                            { label: "Yurei", value: 10 },
                            { label: "Oni", value: 11 },
                            { label: "Yokai", value: 12 },
                            { label: "Hantu", value: 13 },
                            { label: "Goryo", value: 14 },
                            { label: "Myling", value: 15 },
                            { label: "Onryo", value: 16 },
                            { label: "The Twins", value: 17 },
                            { label: "Raiju", value: 18 },
                            { label: "Obake", value: 19 },
                            { label: "Mimic", value: 20 },
                            { label: "Moroi", value: 21 },
                            { label: "Deogen", value: 22 },
                            { label: "Thaye", value: 23 }
                        ]
                    }
                ]
            }
        ],
        ephemeral: true
    });
}