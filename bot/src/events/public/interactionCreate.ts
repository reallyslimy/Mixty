import { client } from '../../index'
import {
  CommandInteractionOptionResolver,
  ChatInputCommandInteraction,
  StringSelectMenuInteraction,
} from 'discord.js'
import { ExtendedInteraction } from 'slimedcommands'

module.exports = {
  event: 'interactionCreate',
  once: false,
  run: async (
    interaction: ChatInputCommandInteraction | StringSelectMenuInteraction
  ) => {
    if (interaction.isChatInputCommand()) {
      if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName)
        if (!command) {
          return interaction.reply(`This command was not found.`)
        }
        if (command.developer && interaction.user.id != '372840998918684672') {
          return interaction.reply({
            content: `This command is only for the developer.`,
            ephemeral: true,
          })
        }

        const isSubcommand = interaction.options.getSubcommand(false)
        if (isSubcommand && command.options) {
          const subcommandFile = client.subCommands.get(
            `${interaction.command?.name}.${isSubcommand}`
          )
          if (!subcommandFile) {
            return interaction.reply(`This subcommand was not found.`)
          }
          subcommandFile.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
          })
        } else {
          command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
          })
        }
      }
    }
  },
}
