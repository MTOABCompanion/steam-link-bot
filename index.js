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

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  // Match steam join link pattern
  const match = message.content.match(/steam:\/\/joinlobby\/\d+\/\d+\/\d+/i);
  if (!match) return;

  const steamLink = match[0];
  const encoded = encodeURIComponent(steamLink);

  // Replace this with your GitHub Pages redirect link
  const redirectUrl = `https://mtoabcompanion.github.io/steamlink/?lobby=${encoded}`;

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel('🎮 Join Game')
      .setStyle(ButtonStyle.Link)
      .setURL(redirectUrl)
  );

  message.reply({
    content: `Here’s your quick-join Steam lobby:`,
    components: [row],
  });
});

client.login(TOKEN);
