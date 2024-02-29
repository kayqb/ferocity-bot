const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Check the current status of the bot.!'),
	async execute(interaction) {
		await interaction.reply('Online and listening.');
	},
};