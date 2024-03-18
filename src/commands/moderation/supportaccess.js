const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const Config = require('../../../config.json');

const ChannelPermissions = {
    [PermissionFlagsBits.ViewChannel]: true,
    [PermissionFlagsBits.Connect]: true,
    [PermissionFlagsBits.Stream]: true,
};

module.exports = {
    name: 'supportaccess',
    deleted: false,
    description: 'Giv person adgang til skærmdeling i support kanal.',
    roleRequired: [
        'example1', // Admin
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
            description: 'Hvilken support kanalen? (1, 2, 3 osv.)',
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('user').value;
        const channelId = Config.channelsIds.supportChannels[interaction.options.get('channel').value.toString()];
        if (channelId === undefined) return interaction.reply({content: 'Dette er ikke en support kanal.', ephemeral: true});
        const channel = await client.channels.cache.get(channelId);
        await channel.permissionOverwrites.edit(targetUserId, ChannelPermissions);
        interaction.reply({content: `<@${targetUserId}> har mulighed for at joine og skærmdele i <#${channelId}> de næste ${Config.general.RemoveSupportPermAfterMin} minutter.`, ephemeral: true});
        setTimeout(() => {
            try {
                channel.permissionOverwrites.delete(targetUserId);
            } catch (error) {
                console.log(`Could not remove user \"${targetUserId}\" from support channel \"${channelId}\": ${error}`);
            }
        }, Config.general.RemoveSupportPermAfterMin * 60 * 1000);
    },
};