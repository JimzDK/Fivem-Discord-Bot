const Config = require('../../../config.json');
const {EmbedBuilder} = require('discord.js');

module.exports = async (client, message) => {
    const channelsIds = Config.channelsIds.onlyAttachmentsChannels;
    for (let i=0; i < channelsIds.length; i++) {
        if (!message.content.includes('https://') && message.channel.id === channelsIds[i] && !message.author.bot && message.attachments.size <= 0) {
            const embed = new EmbedBuilder()

            .setColor('#ff1100')
            .setTitle('BESKED SLETTET')
            .setDescription(`Din besked i <#${message.channel.id}> blev slettet af systemet.\n\nDu kan udelukkende sende billeder/videoer i denne kanal.`)
            .setThumbnail(Config.general.discordLogo)
            .setTimestamp()

            message.delete()
            .then(msg => {
                msg.member.send({embeds: [embed]}).catch(e => {
                    return;
                })
            })
            .catch(e => {
                return;
            })

        }
    }
};