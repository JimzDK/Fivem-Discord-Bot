require('dotenv').config();
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, process.env.GUILD_ID);
        
        for (const localCommand of localCommands) {
            const {name, description, options} = localCommand;
            const existingComamnd = await applicationCommands.cache.find((cmd) => cmd.name === name);
            
            if (existingComamnd) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingComamnd.id);
                    console.log(`Deleted command \"${name}\".`);
                    continue;
                }
                if (areCommandsDifferent(existingComamnd, localCommand)) {
                    await applicationCommands.edit(existingComamnd.id, {description, options});
                    console.log(`Edited command \"${name}\".`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`Skipping command: \"${name}\" (deleted)`);
                    continue;
                }
                await applicationCommands.create({name, description, options});
                console.log(`Registered command: \"${name}\"`);
            }
        }
    } catch (error) {
        console.log(`Error while registering commands: ${error}`);
    };
};