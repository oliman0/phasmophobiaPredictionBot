import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('startprediction')
    .setDescription('Starts a new prediction.')
    .addIntegerOption(option =>
        option.setName('type')
            .setDescription('Prediction type')
            .addChoices(
                { name: 'Yes/No', value: 0 },
                { name: 'Blind Guess', value: 1 }
            )
            .setRequired(true)
    );
    

export async function execute(interaction, context) {
    if (interaction.guildId === 0 || interaction.guildId == undefined) {
        await interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
        return;
    }

    if (context.predictions.has(interaction.guildId)) {
        await interaction.reply({ content: 'There is already an active prediction in this server.', ephemeral: true });
        return;
    }

    const prediction = {
        ghost: Math.floor(Math.random() * 24),
        users: new Map(),
        predictionOpen: true,
        predictionType: interaction.options.getInteger('type')
    };
    context.predictions.set(interaction.guildId, prediction);

    await interaction.reply({
        embeds: [
            {
                title: 'New Prediction!',
                description: `${context.ghosts[prediction.ghost]} has been randomly selected!`
            }
        ],
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 4,
                        custom_id: 'prediction_close',
                        label: 'Close Prediction'
                    }
                ]
            }
        ],
        ephemeral: true
    });

    if (prediction.predictionType === 0) { // Yes/No
        await interaction.followUp({
            embeds: [
                {
                    title: 'Prediction Started!',
                    description: `Will the ghost be **${context.ghosts[prediction.ghost]}** or not?`,
                    color: 0x00B2FF
                }
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 3,
                            custom_id: 'prediction_yes',
                            label: 'Yes'
                        },
                        {
                            type: 2,
                            style: 4,
                            custom_id: 'prediction_no',
                            label: 'No'
                        }
                    ]
                }
            ]
        });
    } else if (prediction.predictionType === 1) { // Blind Guess
        await interaction.followUp({
            embeds: [
                {
                    title: 'Prediction Started!',
                    description: `Guess which ghost it is!`,
                    color: 0x00B2FF
                }
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            custom_id: 'prediction_blind_guess_select',
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
                            ],
                            placeholder: 'Make your guess'
                        }
                    ]
                }
            ]
        });
    }
}