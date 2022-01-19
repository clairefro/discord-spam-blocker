const { isSuspiciousLink } = require('../util/isSuspiciousLink');
const logger = require('../util/logger');
const config = require('../../config');

async function spamCheck(client, message) {
  const links = message.content.match(/(https?:\/\/\S+)\b/g);

  if (links && links.length) {
    const suspiciousLinks = [];

    links.forEach((l) => {
      const isSus = isSuspiciousLink(l);
      if (isSus) {
        suspiciousLinks.push(l);
      }
    });

    if (suspiciousLinks.length) {
      await message.guild.fetch();
      await message.guild.channels.fetch();
      const server = message.guild.name;
      const channel = message.guild.channels.cache.get(message.channelId).name;

      const logMsg = `Suspicious link(s) from user ${message.author.username} (ID: ${message.author.id}) in channel **#${channel}** of the **${server}** server detected. Message automatically deleted. `;
      logger.warn(logMsg + `Suspicious Links: ${suspiciousLinks}`);

      // Make links unclickable by adding space
      const safeLinks = suspiciousLinks.map((l) => {
        let i = l.indexOf('/');
        if (i === -1 || i === l.length - 1) {
          i = 4; // if no slash or slash is at end only, add space at index 4
        }
        return l.slice(0, i) + ' ' + l.slice(i);
      });

      const dmMsg = `---------------------\n🚨WARNING🚨: One or more suspicious looking links associated with spam was sent from your account in the **#${channel}** channel of the **${server}** server\n\nLinks you sent (DO NOT VISIT!):\n\n${safeLinks
        .map((l) => `- ${l}`)
        .join(
          '\n'
        )}\n\nLinks that are slightly similar to 'discord' are often malicious. If you didn't intentionally send these links, there is a chance your account was hacked and is sending out malicious messages. If that is the case, **please change your password and enable two-factor authentication on your Discord account**.\n\nContact a server admin if you have any questions or you believe this was an error!`;

      message.author.send(dmMsg).catch(logger.error);
      message.delete().catch(logger.error);

      /** Notifications */
      // Send message to mod channel if configured
      if (config.modChannelId) {
        const modChannel = client.channels.cache.find(
          (channel) => channel.id === config.modChannelId
        );
        const lines = `--------------\n`;
        modChannel.send(
          lines +
            logMsg +
            `\n\nSuspicious Links (DO NOT VISIT):\n${safeLinks
              .map((l) => `- ${l}`)
              .join('\n')}\n` +
            lines
        );
      }
    }
  }
}

module.exports = { spamCheck };
