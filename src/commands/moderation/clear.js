const {ApplicationCommandOptionType} = require('discord.js');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);

module.exports = {
    name: 'clear',
    deleted: false,
    description: Lang.commands.clear.description,
    roleRequired: [
        'example1', // Admin
    ],
    options: [
        {
            name: 'amount',
            description: Lang.commands.clear.options['amount'],
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    callback: async (_, interaction) => {
        const amount = interaction.options.get('amount').value;
        if (amount > 100) return interaction.reply({content: Lang.commands.clear.error_max, ephemeral: true});
        if (amount < 1) return interaction.reply({content: Lang.commands.clear.error_min, ephemeral: true});
        await interaction.channel.bulkDelete(amount);
        interaction.reply({content: Lang.commands.clear.success.replace('<amount>', amount), ephemeral: true});
    }
};