const fs = require('fs')
const { exec, spawn } = require('child_process')

console.log('Watching for file changes')
let GithubTimeout = null
function Watch() {
	const watcher = fs.watch('./', (evt, file) => {
		if (!file.endsWith('.json') && !file.endsWith('.js')) return
		if (
			file === 'package.json' ||
			file === 'package-lock.json' ||
			file === 'server.js'
		) {
			return RestartServer()
		}
		watcher.close()
		clearTimeout(GithubTimeout)
		console.log('File Change Detected', new Date(), evt, file)
		if (GithubTimeout) clearTimeout(GithubTimeout)
		GithubTimeout = setTimeout(() => {
			console.log('Updating Github')
			UpdateGithub()
		}, 5000)
		setTimeout(Watch, 500)
	})
}

function UpdateGithub() {
	const cmd = 'git add . && git commit -m "Auto Update" && git push'
	// exec(cmd, (_, stdout, __) => {
	// 	console.log(stdout)
	// })
}

function RestartServer() {
	// Restart nodejs server
	console.log('Restarting Server')
	exec('^C && npm start')

}

Watch()
