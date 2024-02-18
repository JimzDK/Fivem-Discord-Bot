# DiscordJSv14
Discord bot written in javascript made for a Danish roleplay server.

Everything beside prints is writtin in Danish and you'll have to translate it yourself.

## Requirements
- [Node.js](https://nodejs.org/en/)

## How to install
1. Create your bot under discords developer portal and tick off everything under "Privileged Gateway Intents"

2. Go to OAuth2 > URL Generator
   - Tick off `applications.commands` and `bot` under "Scopes"
   - Give your bot `Administrator` under "Bot Permissions"
   - Invite your bot

3. Open the terminal and run the following command in your bots folder:
   - `npm install`

4. Create the following files:
   - `.env`
   - `config.json`

5. Fill out values in `.env` and `config.json` (example below)

6. Go under src/commands and change permissions of all the commands to your liking

7. Run `start.bat` or use `node src/index.js` in the terminal

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
