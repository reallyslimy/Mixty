import { Command } from 'bot/src/types/command/command'
import { PermissionsBitField } from 'discord.js'

const ping: Command = {
  name: 'ping',
  description: 'Ping!',
  permissions: ['Administrator'],
  run: async ({ interaction }) => {
    await interaction.reply('Pong!')
  },
}

module.exports = ping
