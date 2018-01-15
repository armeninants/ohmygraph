const validator = require('validator');

module.exports = { 
	validNickname(nickname) {
		return nickname && nickname.length > 2 && nickname.length < 20
	},
};