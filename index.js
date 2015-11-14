'use strict';

let Promise = require('bluebird');
let fs = require('fs');

Promise.promisifyAll(fs);

exports.init = Promise.coroutine(function*(aero, config) {
	if(!config || !config.UA)
		return Promise.reject('You need to specify the "UA" field for the Google Analytics plugin.')

	let scriptPath = require.resolve('./google-analytics.js')

	return fs.readFileAsync(scriptPath, 'utf8')
		.then(code => code.replace('googleAnalyticsUA', `'${config.UA}'`).replace(/(?:\r\n|\r|\n)/g, ''))
		.then(code => aero.pluginScripts.push(code))
});