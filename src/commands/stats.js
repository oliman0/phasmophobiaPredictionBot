import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Displays statistics for the bot.')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('The user to get stats for')
            .setRequired(false)
    );

export async function execute(interaction, context) {
    const targetUser = interaction.options.getUser('user') ?? interaction.user;
    const user = await context.usersCollection.findOne({ discordId: targetUser.id });

    if (user == null) {
        await interaction.reply({ content: `${targetUser.displayName} has no stats yet.`, ephemeral: true });
        return;
    }

    await interaction.reply({
        embeds: [
            {
                title: `***${targetUser.displayName}'s*** Stats`,
                description: `- Points: *${user.points}*`,
                thumbnail: { url: targetUser.displayAvatarURL() },
                color: 0x00B2FF
            }
        ]
    });
}