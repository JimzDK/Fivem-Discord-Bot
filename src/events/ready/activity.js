const { ActivityType } = require('discord.js');
const Config = require('../../../config.json');
const request = require('request');

module.exports = (client) => {
    function updateActivity() {
        request.get({
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
                        name: 'Server Offline',
                        type: ActivityType.Watching
                    }]
                })
                return;
            };

            client.user.setPresence({
                status: Config.general.activity,
                activities: [{
                    name: `Online ${data.clients}/${data.sv_maxclients}`,
                    type: ActivityType.Watching
                }]
            })

        })
    }

    setInterval(updateActivity, 5000);

    updateActivity();
};