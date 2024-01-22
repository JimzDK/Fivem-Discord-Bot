const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');
const Config = require('../../../config.json');

module.exports = {
    name: 'unwhitelist',
    deleted: false,
    description: 'Unwhitelist en person',
    roleRequired: [
        '1049063601618567248', // Support
        '1073920432916410429', // Whitelist Ansvarlig
        '1087763060246204598', // Whitelist Modtager
    ],
    options: [
        {
            name: 'user',
            description: 'Personen som skal have fjernet whitelist',
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('user').value;
        const targetUser = await interaction.guild.members.fetch(targetUserId);
        const whitelistRole = interaction.guild.roles.cache.get(Config.roleIds.whitelistRole);
        if (interaction.channel.id !== Config.channelsIds.whitelistCommands) return interaction.reply({content: `Denne kommando kan kun benyttes i <#${Config.channelsIds.whitelistCommands}>`, ephemeral: true});
        try {
            await targetUser.roles.remove(whitelistRole);
            const embed = new EmbedBuilder()

            .setTitle('UNWHITELIST')
            .setDescription(`<@${targetUserId}> fik frataget whitelist!\n\nUnwhitelistet af <@${interaction.member.id}>`)
            .setThumbnail(Config.general.discordLogo)
            .setTimestamp()
    
            await interaction.reply({embeds: [embed]})
        } catch (error) {
            interaction.reply({content: `En fejl opstod: \`${error}\``, ephemeral: true});
            console.log(`Error during command \"unwhitelist\": ${error}`);
        }
    },
};