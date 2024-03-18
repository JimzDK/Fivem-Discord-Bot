const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'clear',
    deleted: false,
    description: 'Slet et bestemt antal beskeder fra chatten',
    roleRequired: [
        'example1', // Admin
    ],
    options: [
        {
            name: 'amount',
            description: 'Hvor mange beskeder skal slettes?',
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    callback: async (_, interaction) => {
        const amount = interaction.options.get('amount').value;
        if (amount > 100) return interaction.reply({content: 'Du kan maksimum slette 100 beskeder af gangen.', ephemeral: true});
        if (amount < 1) return interaction.reply({content: 'Du skal minimum slette 1 besked af gangen.', ephemeral: true});
        await interaction.channel.bulkDelete(amount);
        interaction.reply({content: `Slettede ${amount} beskeder fra kanalen.`, ephemeral: true});
    }
};