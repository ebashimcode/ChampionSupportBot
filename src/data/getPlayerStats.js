const { default: axios } = require('axios');

async function getPlayerStats(playerId) {
    try {
        const response = await axios.get(process.env.API_URL + 'statistics/players/' + +playerId);

        return response.data;
    } catch (e) {
        return null;
    }
}

module.exports = getPlayerStats;
