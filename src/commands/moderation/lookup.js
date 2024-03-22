const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);
const Request = require('request');

module.exports = {
    name: 'lookup',
    deleted: false,
    description: Lang.commands.lookup.description,
    roleRequired: [
        'example1', // Admin
    ],
    options: [
        {
            name: 'ingame-id',
            description: Lang.commands.lookup.options['ingame-id'],
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    callback: async (_, interaction) => {
        const searchID = interaction.options.get('ingame-id').value;
        Request.get({
            url: `https://servers-frontend.fivem.net/api/servers/single/${Config.general.cfxip}`,
            json: true,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0' }
        }, (err, res, _data) => {
            if (err) {
                console.log('Lookup API Error:', err);
                return
            }

            if (res.statusCode == 404) return interaction.reply({content: Lang.commands.lookup.server_down, ephemeral: true});            

            const data = _data["Data"];
            const players = data["players"];

            for (let i = 0; i < players.length; i++) {
                let player = players[i]
                if (player?.id == searchID) {
                    let identifiers = player?.identifiers.toString().split(',').join('\n');
                    const embed = new EmbedBuilder()
                    .setColor('#3285a8')
                    .setTitle(Lang.commands.lookup.title.replace('<searchID>', searchID))
                    .setDescription(Lang.commands.lookup.text
                        .replace('<name>', player?.name)
                        .replace('<ping>', player?.ping)
                        .replace('<identifiers>', identifiers)
                    )
                    .setTimestamp()
                    if (Config.general.discordLogo.includes('https://')) {
                        embed.setThumbnail(Config.general.discordLogo);
                    };
                    return interaction.reply({embeds: [embed], ephemeral: true});
                }
            }

            return interaction.reply({content: Lang.commands.lookup.player_offline, ephemeral: true})

        })
    }
};