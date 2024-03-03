const { SlashCommandBuilder } = require('discord.js');
const { WOMClient } = require('@wise-old-man/utils');

module.exports = {
	cooldown: 10,
	category: 'member',
	data: new SlashCommandBuilder().setName('rank')
		.setDescription('Calculate the rank for a clan member.')
		.addMentionableOption(option =>
			option.setName('discord_user')
				.setDescription('Discord user to rank')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('rsn')
				.setDescription('In-game Name')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('total_level')
				.setDescription('Total Lompleted')
				.setRequired(true)
				.setMinValue(0))
		.addIntegerOption(option =>
			option.setName('quests')
				.setDescription('Quests Completed')
				.setRequired(true)
				.setMinValue(0))
		.addIntegerOption(option =>
			option.setName('achievements')
				.setDescription('Achievements Completed')
				.setRequired(true)
				.setMinValue(0))
		.addIntegerOption(option =>
			option.setName('combat_tasks')
				.setDescription('Combat Tasks Completed')
				.setRequired(true)
				.setMinValue(0))
		.addIntegerOption(option =>
			option.setName('collection_logs')
				.setDescription('Collections Logged')
				.setRequired(true)
				.setMinValue(0)),
	async execute(interaction) {
		const womClient = new WOMClient();

		const username = interaction.options.getUser('discord_user');
		const rsn = interaction.options.getString('rsn');

		const playerDetails = await womClient.players.getPlayerDetails(rsn);

		const combatLevel = playerDetails.combatLevel;
		const ehb = playerDetails.ehb;
		const ehp = playerDetails.ehp;

		const totalLevel = interaction.options.getInteger('total_level');
		const questsCompleted = interaction.options.getInteger('quests');
		const achievementsCompleted = interaction.options.getInteger('achievements');
		const combatTasksCompleted = interaction.options.getInteger('combat_tasks');
		const collectionsLogged = interaction.options.getInteger('collection_logs');

		console.log(`Fetching stats for ${username} and ${rsn}`);

		const totalPoints = combatLevel + totalLevel + questsCompleted + achievementsCompleted + combatTasksCompleted + collectionsLogged + ehp + ehb;
		const formattedPoints = totalPoints.toFixed(0);

		const rank = calculateRank(totalPoints);

		await interaction.reply(`Your rank ${username} is ${rank} with ${formattedPoints} points`);
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
