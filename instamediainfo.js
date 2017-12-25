var TelegramBot = require('./node_modules/node-telegram-bot-api');

var token = 'REPLACE_TOKEN';
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/instagrab/, function(msg, match) {
	const { URL } = require('url');
	const myURL = new URL('https://www.instagram.com/p/BdCbLmWAZR2/?taken-by=sayaka__714');

	myURL.search = 'media?size=l';
	var myURL2 = myURL.href;
	
	require('request').get('https://api.instagram.com/oembed/?url=https://www.instagram.com/p/BdCbLmWAZR2/?taken-by=sayaka__714', (error, response, body) => {
		if (!error && response.statusCode === 200) {
			var resp = JSON.parse(body);
			var fromId = msg.chat.id;
			bot.sendPhoto(fromId, myURL2, {caption: 'Description:\n'+resp.title+'\n\nProfile:\n'+resp.author_url+''});
		}
	})
});