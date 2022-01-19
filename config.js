require('dotenv').config();

const REQUIRED = ['DISCORD_APP_CLIENT_ID', 'DISCORD_BOT_TOKEN'];

const missing = [];
REQUIRED.forEach((v) => {
  if (!process.env[v] || process.env[v] === '') {
    missing.push(v);
  }
});

if (missing.length) {
  throw new Error(
    `CRITICAL ERROR. Missing values for env vars: ${JSON.stringify(
      missing
    )}. Add these to .env file`
  );
}

module.exports = {
  discordAppClientId: process.env.DISCORD_APP_CLIENT_ID,
  discordBotToken: process.env.DISCORD_BOT_TOKEN,
  modChannelId: process.env.MOD_CHANNEL_ID,
  whitelist: ['discordjs'] // these typosquat-y looking domains are legit
};
