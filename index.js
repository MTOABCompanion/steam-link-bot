const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

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
  const redirectUrl = `https://mtoabcompanion.github.io/steamlink/?lobby=${encoded}`;

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel('Join Game')
      .setStyle(ButtonStyle.Link)
      .setURL(redirectUrl)
  );

  try {
    await message.delete();
    await new Promise(resolve => setTimeout(resolve, 300));
  } catch (error) {
    console.error('❌ Failed to delete message:', error);
  }

  const displayName = message.member?.nickname || message.author.username;

  await message.channel.send({
    content: `Click to join **${displayName}**'s lobby:`,
    components: [row],
  });
});

client.login(TOKEN);
