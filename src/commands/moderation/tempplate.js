const {ApplicationCommandOptionType} = require('discord.js');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);
const Tempplates = Lang.commands.tempplate.tempplates;

let optionChoices = [];
for (let i = 0; i < Tempplates.length; i++) {
    optionChoices[optionChoices.length] = {
        name: Tempplates[i].name,
        value: i.toString()
    };
};

module.exports = {
    name: 'tempplate',
    deleted: false,
    description: Lang.commands.tempplate.description,
    roleRequired: [
        'example1', // Admin
    ],
    options: [
        {
            name: 'type',
            description: Lang.commands.tempplate.options['type'],
            required: true,
            choices: optionChoices,
            type: ApplicationCommandOptionType.String,
        },
    ],
    callback: async (_, interaction) => {
        const type = interaction.options.get('type').value;
        interaction.reply(Tempplates[type].reply);
    }
};