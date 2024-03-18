const { ActivityType } = require('discord.js');
const Config = require('../../../config.json');
const Lang = require(`../../locale/${Config.general.lang}.json`);
const Request = require('request');

module.exports = (client) => {
    function updateActivity() {
        Request.get({
            url: `https://servers-frontend.fivem.net/api/servers/single/${Config.general.cfxip}`,
            json: true,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0' }
        }, (err, res, _data) => {
            if (err) {
                console.log('Lookup API Error:', err);
                return
            }

            const data = _data["Data"];

            if (res.statusCode == 404 || data?.clients == undefined || data?.sv_maxclients == undefined) {
                client.user.setPresence({
                    status: Config.general.activity,
                    activities: [{
                        name: Lang.misc.activity_offline,
                        type: ActivityType.Watching
                    }]
                })
                return;
            };

            client.user.setPresence({
                status: Config.general.activity,
                activities: [{
                    name: Lang.misc.activity
                    .replace('<players>', data.clients)
                    .replace('<maxPlayers>', data.sv_maxclients),
                    type: ActivityType.Watching
                }]
            })

        })
    }

    setInterval(updateActivity, 5000);

    updateActivity();
};