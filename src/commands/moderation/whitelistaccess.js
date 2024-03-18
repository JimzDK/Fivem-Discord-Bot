const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const Config = require('../../../config.json');

const ChannelPermissions = {
    [PermissionFlagsBits.ViewChannel]: true,
    [PermissionFlagsBits.Connect]: true,
    [PermissionFlagsBits.Stream]: true,
};

module.exports = {
    name: 'whitelistaccess',
    deleted: false,
    description: 'Giv person adgang til skærmdeling i whitelist kanal.',
    roleRequired: [
        'example1', // Admin
        'example2', // Whitelist Team
    ],
    options: [
        {
            name: 'user',
            description: 'Hvilken person skal have adgang til skærmdeling?',
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: 'channel',
            description: 'Hvilken whitelist kanalen? (1, 2, 3 osv.)',
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('user').value;
        const channelId = Config.channelsIds.whitelistChannels[interaction.options.get('channel').value.toString()];
        if (channelId === undefined) return interaction.reply({content: 'Dette er ikke en whitelist kanal.', ephemeral: true});
        const channel = await client.channels.cache.get(channelId);
        await channel.permissionOverwrites.edit(targetUserId, ChannelPermissions);
        interaction.reply({content: `<@${targetUserId}> har mulighed for at joine og skærmdele i <#${channelId}> de næste ${Config.general.RemoveWhitelistPermAfterMin} minutter.`, ephemeral: true});
        setTimeout(() => {
            try {
                channel.permissionOverwrites.delete(targetUserId);
            } catch (error) {
                console.log(`Could not remove user \"${targetUserId}\" from whitelist channel \"${channelId}\": ${error}`);
            }
        }, Config.general.RemoveWhitelistPermAfterMin * 60 * 1000);
    },
};