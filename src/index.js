const { Client, Intents } = require('discord.js');
const config = require('../config');
const { spamCheck } = require('./lib/spamCheck');
const logger = require('./util/logger');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS
  ]
});

client.on('ready', () => console.log(`Bot logged in as ${client.user.tag}`));

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  try {
    spamCheck(client, message);
  } catch (err) {
    logger.error('Spam check operation failed', err);
  }
});

client.login(config.discordBotToken);
