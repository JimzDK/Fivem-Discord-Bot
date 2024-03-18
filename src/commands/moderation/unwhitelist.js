const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);

module.exports = {
    name: 'unwhitelist',
    deleted: false,
    description: Lang.commands.unwhitelist.description,
    roleRequired: [
        'example1', // Admin
        'example2', // Whitelist Team
    ],
    options: [
        {
            name: 'user',
            description: Lang.commands.unwhitelist.options['user'],
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    callback: async (_, interaction) => {
        const targetUserId = interaction.options.get('user').value;
        const targetUser = await interaction.guild.members.fetch(targetUserId);
        const whitelistRole = interaction.guild.roles.cache.get(Config.roleIds.whitelistRole);
        if (interaction.channel.id !== Config.channelsIds.whitelistCommands) return interaction.reply({content: Lang.commands.unwhitelist.wrong_channel.replace('<channel>', Config.channelsIds.whitelistCommands), ephemeral: true});
        await targetUser.roles.remove(whitelistRole);
        const embed = new EmbedBuilder()
        .setTitle(Lang.commands.unwhitelist.title)
        .setDescription(Lang.commands.unwhitelist.text
            .replace('<targetUserID>', targetUserId)
            .replace('<userId>', interaction.member.id)
            )
        .setTimestamp()
        if (Config.general.discordLogo.includes('https://') && Config.general.discordLogo.includes('.com')) {
            embed.setThumbnail(Config.general.discordLogo);
        };

        interaction.reply({embeds: [embed]});
    }
};