const Config = require('../../../config.json');
const {EmbedBuilder} = require('discord.js');

module.exports = async (_, message) => {
    const channelsIds = Config.channelsIds.onlyAttachmentsChannels;
    for (let i = 0; i < channelsIds.length; i++) {
        if (!message.content.includes('https://') && message.channel.id === channelsIds[i] && !message.author.bot && message.attachments.size <= 0) {
            const embed = new EmbedBuilder()

            .setColor('#ff1100')
            .setTitle('BESKED SLETTET')
            .setDescription(`Din besked i <#${message.channel.id}> blev slettet af systemet.\n\nDu kan udelukkende sende billeder/videoer i denne kanal.`)
            .setTimestamp()
            if (Config.general.discordLogo.includes('https://') && Config.general.discordLogo.includes('.com')) {
                embed.setThumbnail(Config.general.discordLogo);
            };
            await message.delete().catch(err => {
                console.log(`Error while trying to delete message: ${err}`)
            })
            message.member.send({embeds: [embed]}).catch(err => {
                return;
            });
        }
    }
};