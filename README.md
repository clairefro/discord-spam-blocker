A BYOD (Bring your own deployment) Discord bot for blocking [typosquat](https://en.wikipedia.org/wiki/Typosquatting) attacks common with Nitro scams and informing users their account may have been compromised.

<img src="https://user-images.githubusercontent.com/9841162/150050893-4e083f60-39a3-4b19-a10c-77f6ab3ad97f.png" height="700px" />

**DOES**

- Protect your server channels from spreading annoying scams to other users
- Automatically deletes messages that contain typosquat links like `https://discrode.gift/redeem/FHKjdsfsjkhU`
- DMs users informing them that their account may have been compromised. Informs them to change password/add 2FA if necessary
- (Optional) Logs details of each spam block event to a specified `MOD_CHANNEL_ID`

**DOES NOT**

- Prevent users from `@everyone` tagging. If you want to prevent that, update your Discord server member tagging settings
- Prevent DM spam to users (that's out of your server's control)

## Details

Typosquat links are commonly used in Nitro scams to lure server members into revealing personal data that compromises their account and spams malicious links. The links look "legit" at a glance because they are slight mispellings of the Discord domain.

This bot uses a [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) threshold to detect potential spam messages. Levenshtein distance is calculated with package [`fastest-levenshtein`](https://www.npmjs.com/package/fastest-levenshtein)

For example, while `https://discord.com` is safe, the following domains that differ by **4 edits or less** will trigger the bot:

- `https://discrod.com` ("discrod" = distance 2)
- `http://discrod.com` ("discrod" = distance 2)
- `https://discrode.gift/FHFHsijvdiU` ("discrode" = distance 3)
- `http://www.ddiscord.gift/nitro/redeem` ("ddiscord" = distance 1)

If a message contains a link that looks suspicious by this standard, the message is automatically deleted and the user is informed in a direct message. Optional logging of these attacks can be sent to a specified Discord channel.

## Setting up

### Create Discord app/bot

1. Create a new app in [Discord Developer Portal](https://discord.com/developers/applications)

1. Enable Intents: Server Members, Server Messages

![image](https://user-images.githubusercontent.com/9841162/150038516-4ba92006-aedd-4118-95d6-959f7b7be450.png)

1. Save App Client ID to `DISCORD_APP_CLIENT_ID` in `.env`
1. Create bot on app

### Deploy bot

1. Deploy this Discord bot code somewhere (Suggestions for free hosting: [Railway](https://railway.app/) or [Heroku](https://heroku.com/))
1. Set up environment variables:

`DISCORD_APP_CLIENT_ID`

`DISCORD_BOT_TOKEN`

`MOD_CHANNEL_ID` (OPTIONAL but recommended)

Channel ID for Discord channel to log events. I recommend a private channel for mods. You can find channel IDs by [enabling developer mode](https://www.howtogeek.com/714348/how-to-enable-or-disable-developer-mode-on-discord/#:~:text=In%20Discord's%20settings%20menu%2C%20select,the%20%E2%80%9CDeveloper%20Mode%E2%80%9D%20option.) in Discord

### Invite link

Too add the bot to your server with proper permissions, copy this link, replace `YOUR_APP_CLIENT_ID` with your app client ID, and paste into a browser. Follow the prompt on screen

`https://discord.com/api/oauth2/authorize?client_id=YOUR_APP_CLIENT_ID&permissions=92160&scope=bot`

## Development

Install
`npm i`

Follow steps in "Create Discord app/bot" above for a sandbox server.

Set up local config with

1. `cp .env.example .env`
1. Update the variable values in `.env` only

Start dev server

`yarn dev`
