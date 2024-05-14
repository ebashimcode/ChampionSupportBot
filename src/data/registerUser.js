const { default: axios } = require("axios");

async function registerUser(userId) {
    console.log(process.env.API_URL + 'register');

    try {
        await axios.post(process.env.API_URL + 'register', {
            id: userId
        });
    
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = registerUser;