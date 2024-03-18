const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);
const ChannelPermissions = {
    [PermissionFlagsBits.ViewChannel]: true,
    [PermissionFlagsBits.Connect]: true,
    [PermissionFlagsBits.Stream]: true,
};

module.exports = {
    name: 'whitelistaccess',
    deleted: false,
    description: Lang.commands.whitelistaccess.description,
    roleRequired: [
        'example1', // Admin
        'example2', // Whitelist Team
    ],
    options: [
        {
            name: 'user',
            description: Lang.commands.whitelistaccess.options['user'],
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: 'channel',
            description: Lang.commands.whitelistaccess.options['channel'],
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('user').value;
        const channelId = Config.channelsIds.whitelistChannels[interaction.options.get('channel').value.toString()];
        if (channelId === undefined) return interaction.reply({content: Lang.commands.whitelistaccess.no_channel, ephemeral: true});
        const channel = await client.channels.cache.get(channelId);
        await channel.permissionOverwrites.edit(targetUserId, ChannelPermissions);
        interaction.reply({
            content: Lang.commands.whitelistaccess.success
            .replace('<targetUserID>', targetUserId)
            .replace('<channelID>', channelId)
            .replace('<timeLeft>', Config.general.RemoveWhitelistPermAfterMin),
            ephemeral: true
        });
        setTimeout(async () => {
            await channel.permissionOverwrites.delete(targetUserId).catch(error => {
                console.log(`Could not remove user \"${targetUserId}\" from whitelist channel \"${channelId}\": ${error}`);
            });
        }, Config.general.RemoveWhitelistPermAfterMin * 60 * 1000);
    }
};