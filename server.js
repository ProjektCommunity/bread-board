const fs = require('fs')
const { exec } = require('child_process')

console.log('Watching for file changes')
let GithubTimeout = null
function Watch() {
	const watcher = fs.watch('./', (evt, file) => {
		if (!file.endsWith('.json' || '.js')) return
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
	exec(cmd, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stdout)
	})
}

Watch()
