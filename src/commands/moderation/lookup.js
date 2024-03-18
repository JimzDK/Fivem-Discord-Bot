const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');
const Config = require('../../../config.json');
const request = require('request');

module.exports = {
    name: 'lookup',
    deleted: false,
    description: 'Søg information op på spiller via. ID',
    roleRequired: [
        'example1', // Admin
    ],
    options: [
        {
            name: 'ingame-id',
            description: 'Ingame ID',
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    callback: async (_, interaction) => {
        const searchID = interaction.options.get('ingame-id').value;
        request.get({
            url: `https://servers-frontend.fivem.net/api/servers/single/${Config.general.cfxip}`,
            json: true,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0' }
        }, (err, res, _data) => {
            if (err) {
                console.log('Lookup API Error:', err);
                return
            }

            if (res.statusCode == 404) return interaction.reply({content: 'Serveren ser ud til at være nede..', ephemeral: true});            

            const data = _data["Data"];
            const players = data["players"];

            for (i = 0; i < players.length; i++) {
                let player = players[i]
                if (player?.id == searchID) {
                    let identifiers = player?.identifiers.toString().split(',').join('\n');
                    const embed = new EmbedBuilder()
                    .setColor('#3285a8')
                    .setTitle(`SPILLER LOOKUP (ID: ${searchID})`)
                    .setDescription(`Navn: ${player?.name}\nPing: ${player?.ping}\n\n**Identifiers**\n${identifiers}`)
                    .setTimestamp()
                    if (Config.general.discordLogo.includes('https://') && Config.general.discordLogo.includes('.com')) {
                        embed.setThumbnail(Config.general.discordLogo);
                    };
                    return interaction.reply({embeds: [embed], ephemeral: true});
                }
            }

            return interaction.reply({content: 'Spilleren er ikke online.', ephemeral: true})

        })
    },
};