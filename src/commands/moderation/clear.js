const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'clear',
    deleted: false,
    description: 'Slet et bestemt antal beskeder fra chatten',
    roleRequired: [
        '1049063601618567248', // Support
    ],
    options: [
        {
            name: 'amount',
            description: 'Hvor mange beskeder skal slettes?',
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    callback: async (client, interaction) => {
        const amount = interaction.options.get('amount').value;
        if (amount > 100) return interaction.reply({content: 'Du kan maksimum slette 100 beskeder af gangen.', ephemeral: true});
        if (amount < 1) return interaction.reply({content: 'Du skal minimum slette 1 besked af gangen.', ephemeral: true});
        try {
            await interaction.channel.bulkDelete(amount);
            interaction.reply({content: `Slettede ${amount} beskeder fra kanalen.`, ephemeral: true});
        } catch (error) {
            interaction.reply({content: `En fejl opstod: \`${error}\``, ephemeral: true});
            console.log(`Error during command \"clear\": ${error}`);
        }
    }
};