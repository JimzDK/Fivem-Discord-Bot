const {EmbedBuilder} = require('discord.js');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);

module.exports = async (_, message) => {
    const channelsIds = Config.channelsIds.onlyAttachmentsChannels;
    for (let i = 0; i < channelsIds.length; i++) {
        if (!message.content.includes('https://') && message.channel.id === channelsIds[i] && !message.author.bot && message.attachments.size <= 0) {
            const embed = new EmbedBuilder()

            .setColor('#ff1100')
            .setTitle(Lang.misc.message_delete_title)
            .setDescription(Lang.misc.message_delete_text.replace('<channelID>', message.channel.id))
            .setTimestamp()
            if (Config.general.discordLogo.includes('https://') && Config.general.discordLogo.includes('.com')) {
                embed.setThumbnail(Config.general.discordLogo);
            };
            await message.delete().catch(err => {
                console.log(`Error while trying to delete message: ${err}`)
            })
            message.member.send({embeds: [embed]}).catch(_ => {
                return;
            });
        }
    }
};