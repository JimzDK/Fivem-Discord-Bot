const {PermissionFlagsBits} = require('discord.js');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    const localCommands = getLocalCommands();
    
    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
        
        if (!commandObject) return;
        
        if (commandObject.roleRequired === undefined || commandObject.roleRequired.length === 0) return await commandObject.callback(client, interaction);
        
        for (var i = 0; i < commandObject.roleRequired.length; i++) {
            if (interaction.member.roles.cache.has(commandObject.roleRequired[i]) || interaction.member.permissions.has([PermissionFlagsBits.Administrator])) {
                return await commandObject.callback(client, interaction);
            }
        }
        
        interaction.reply({
            content: 'Du har ikke adgang til denne kommando.',
            ephemeral: true,
        });
        
    } catch (error) {
        interaction.reply({content: `En fejl opstod: \`${error}\``, ephemeral: true});
        console.log(`There was an error running command \"${interaction.commandName}\": ${error}`);
    }
};