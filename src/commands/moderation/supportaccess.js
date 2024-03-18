const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);

const ChannelPermissions = {
    [PermissionFlagsBits.ViewChannel]: true,
    [PermissionFlagsBits.Connect]: true,
    [PermissionFlagsBits.Stream]: true,
};

module.exports = {
    name: 'supportaccess',
    deleted: false,
    description: Lang.commands.supportaccess.description,
    roleRequired: [
        'example1', // Admin
    ],
    options: [
        {
            name: 'user',
            description: Lang.commands.supportaccess.options['user'],
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: 'channel',
            description: Lang.commands.supportaccess.options['channel'],
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('user').value;
        const channelId = Config.channelsIds.supportChannels[interaction.options.get('channel').value.toString()];
        if (channelId === undefined) return interaction.reply({content: Lang.commands.supportaccess.no_channel, ephemeral: true});
        const channel = await client.channels.cache.get(channelId);
        await channel.permissionOverwrites.edit(targetUserId, ChannelPermissions);
        interaction.reply({
            content: Lang.commands.supportaccess.success
            .replace('<targetUserID>', targetUserId)
            .replace('<channelID>', channelId)
            .replace('<timeLeft>', Config.general.RemoveSupportPermAfterMin),
            ephemeral: true
        });
        setTimeout(async () => {
            await channel.permissionOverwrites.delete(targetUserId).catch(error => {
                console.log(`Could not remove user \"${targetUserId}\" from support channel \"${channelId}\": ${error}`);
            });
        }, Config.general.RemoveSupportPermAfterMin * 60 * 1000);
    },
};