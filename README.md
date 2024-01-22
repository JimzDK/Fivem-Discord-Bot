# DiscordJSv14
Discord bot written in javascript made for a Danish roleplay server.

Everything beside prints is writtin in Danish and you'll have to translate it yourself.

## Requirements
- [Node.js](https://nodejs.org/en/)

## How to install
1. Open the terminal and run the following command:
   - `npm install`

4. Create following files:
   - `.env`
   - `config.json`

3. Fill out values in `.env` and `config.json` (example below)

4. Run `start.bat` or use `node src/index.js` or the terminal

## ENV file example
```
TOKEN = ''
GUILD_ID = ''
CLIENT_ID = ''
```

## Config file example
```json
{
    "general": {
        "cfxip": "serverip",
        "activity": "dnd",
        "discordLogo": "https://i.imgur.com/example.png",
        "RemoveSupportPermAfterMin": 5,
        "RemoveWhitelistPermAfterMin": 1.5
    },
    "roleIds": {
        "whitelistRole": "roleID"
    },
    "channelsIds": {
        "whitelistCommands": "channelID",
        "onlyAttachmentsChannels": [
            "channelID1",
            "channelID2",
            "channelID3"
        ],
        "supportChannels": {
            "1": "channelID1",
            "2": "channelID2",
            "3": "channelID3"
        },
        "whitelistChannels": {
            "1": "channelID1",
            "2": "channelID2",
            "3": "channelID3"
        }
    }
}
```
