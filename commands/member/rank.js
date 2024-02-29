const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 10,
	category: 'member',
	data: new SlashCommandBuilder().setName('rank')
		.setDescription('Calculate the rank for a clan member.')
		.addUserOption(option =>
			option.setName('discord_user')
				.setDescription('Discord user to rank')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('rsn')
				.setDescription('In-game Name')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('combat_level')
				.setDescription('Combat Level')
				.setRequired(true)
				.setMinValue(3))
		.addNumberOption(option =>
			option.setName('total_level')
				.setDescription('Total Level')
				.setRequired(true)
				.setMinValue(32))
		.addNumberOption(option =>
			option.setName('quests')
				.setDescription('Quests Completed')
				.setRequired(true)
				.setMinValue(0))
		.addNumberOption(option =>
			option.setName('achievements')
				.setDescription('Achievements Completed')
				.setRequired(true)
				.setMinValue(0))
		.addNumberOption(option =>
			option.setName('combat_tasks')
				.setDescription('Combat Tasks Completed')
				.setRequired(true)
				.setMinValue(0))
		.addNumberOption(option =>
			option.setName('collection_logs')
				.setDescription('Collections Logged')
				.setRequired(true)
				.setMinValue(0)),
	async execute(interaction) {
		const username = interaction.options.getUser('discord_user');
		const rsn = interaction.options.getString('rsn');
		const combatLevel = interaction.options.getNumber('combat_level');
		const totalLevel = interaction.options.getNumber('total_level');
		const questsCompleted = interaction.options.getNumber('quests');
		const achievementsCompleted = interaction.options.getNumber('achievements');
		const combatTasksCompleted = interaction.options.getNumber('combat_tasks');
		const collectionsLogged = interaction.options.getNumber('collection_logs');

		console.log(`Fetching stats for ${username} and ${rsn}`);

		const totalPoints = combatLevel + totalLevel + questsCompleted + achievementsCompleted + combatTasksCompleted + collectionsLogged;

		await interaction.reply(`Your rank is ${calculateRank(totalPoints)} with ${totalPoints} points`);
	},
};

function calculateRank(totalPoints) {
	const ranks = {
		Gamer: 	{ threshold: 9000 },
		Completionist: { threshold: 8000 },
		Paladin: { threshold: 7000 },
		Knight: { threshold: 6000 },
		Expert: { threshold: 5000 },
		Inquisitor: { threshold: 4000 },
		Ninja: { threshold: 3000 },
		Striker: { threshold: 2000 },
		Duelist: { threshold: 1000 },
		Squire: { threshold: 0 },
	};

	for (const [rank, { threshold }] of Object.entries(ranks)) {
		if (totalPoints >= threshold) {
			return rank;
		}
	}
}