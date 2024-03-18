const {PermissionFlagsBits} = require('discord.js');
const GetLocalCommands = require('../../utils/getLocalCommands');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    const localCommands = GetLocalCommands();
    
    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
        
        if (!commandObject) return;
        
        if (commandObject.roleRequired === undefined || commandObject.roleRequired.length === 0) return await commandObject.callback(client, interaction);
        
        for (var i = 0; i < commandObject.roleRequired.length; i++) {
            if (interaction.member.roles.cache.has(commandObject.roleRequired[i]) || interaction.member.permissions.has([PermissionFlagsBits.Administrator])) {
                return await commandObject.callback(client, interaction);
            }
        }
        interaction.reply({ content: Lang.misc.no_access, ephemeral: true});
    } catch (error) {
        interaction.reply({content: Lang.misc.error_occurred.replace('<error>', error), ephemeral: true});
        console.log(`There was an error running command \"${interaction.commandName}\": ${error}`);
    }
};