const fs = require('fs')
const { exec } = require('child_process')

console.log('Watching for file changes')
function Watch() {
	const watcher = fs.watch('./', (evt, file) => {
		if (!file.endsWith('.json' || '.js')) return
		watcher.close()
		console.log('File Change Detected', new Date(), evt, file)
		setTimeout(UpdateGithub, 1000)
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
