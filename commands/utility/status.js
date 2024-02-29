const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 10,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Check the current status of the bot.'),
	async execute(interaction) {
		await interaction.reply('Online');
	},
};