// index.js
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config(); // Loads .env

const TOKEN = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const match = message.content.match(/steam:\/\/joinlobby\/\d+\/\d+\/\d+/);
  if (!match) return;

  const steamLink = match[0];
  const encoded = encodeURIComponent(steamLink);
  const redirectUrl = `https://mtoabcompanion.github.io/steamlink/lobby?link=${encoded}`;

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel('Join Game')
      .setStyle(ButtonStyle.Link)
      .setURL(redirectUrl)
  );

  // Don’t delete the message — just reply with a button
  await message.reply({
    content: 'Here’s your quick-join Steam lobby:',
    components: [row],
  });
});


client.login(TOKEN);
