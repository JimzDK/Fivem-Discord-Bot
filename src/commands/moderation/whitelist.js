const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);

module.exports = {
    name: 'whitelist',
    deleted: false,
    description: Lang.commands.whitelist.description,
    roleRequired: [
        'example1', // Admin
        'example2', // Whitelist Team
    ],
    options: [
        {
            name: 'user',
            description: Lang.commands.whitelist.options['user'],
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    callback: async (_, interaction) => {
        const targetUserId = interaction.options.get('user').value;
        const targetUser = await interaction.guild.members.fetch(targetUserId);
        const whitelistRole = interaction.guild.roles.cache.get(Config.roleIds.whitelistRole);
        if (interaction.channel.id !== Config.channelsIds.whitelistCommands) return interaction.reply({content: Lang.commands.whitelist.wrong_channel.replace('<channel>', Config.channelsIds.whitelistCommands), ephemeral: true});
        await targetUser.roles.add(whitelistRole);
        const embed = new EmbedBuilder()
        .setColor('#3285a8')
        .setTitle(Lang.commands.whitelist.title)
        .setDescription(Lang.commands.whitelist.text
            .replace('<targetUserID>', targetUserId)
            .replace('<userId>', interaction.member.id)
        )
        .setTimestamp()
        if (Config.general.discordLogo.includes('https://')) {
            embed.setThumbnail(Config.general.discordLogo);
        };
        interaction.reply({embeds: [embed]});
    }
};