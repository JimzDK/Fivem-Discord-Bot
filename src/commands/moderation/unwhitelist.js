const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');
const Config = require('../../../config.json');

module.exports = {
    name: 'unwhitelist',
    deleted: false,
    description: 'Unwhitelist en person',
    roleRequired: [
        'example1', // Admin
        'example2', // Whitelist Team
    ],
    options: [
        {
            name: 'user',
            description: 'Personen som skal have fjernet whitelist',
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    callback: async (_, interaction) => {
        const targetUserId = interaction.options.get('user').value;
        const targetUser = await interaction.guild.members.fetch(targetUserId);
        const whitelistRole = interaction.guild.roles.cache.get(Config.roleIds.whitelistRole);
        if (interaction.channel.id !== Config.channelsIds.whitelistCommands) return interaction.reply({content: `Denne kommando kan kun benyttes i <#${Config.channelsIds.whitelistCommands}>`, ephemeral: true});
        await targetUser.roles.remove(whitelistRole);
        const embed = new EmbedBuilder()
        .setTitle('UNWHITELIST')
        .setDescription(`<@${targetUserId}> fik frataget whitelist!\n\nUnwhitelistet af <@${interaction.member.id}>`)
        .setTimestamp()
        if (Config.general.discordLogo.includes('https://') && Config.general.discordLogo.includes('.com')) {
            embed.setThumbnail(Config.general.discordLogo);
        };

        interaction.reply({embeds: [embed]});
    },
};