const fs = require('fs')
const { exec } = require('child_process')

console.log('Watching for file changes')
fs.watch('./', (event, fileName) => {
	let timer
	if (fileName.includes('.json')) {
		console.log(`File ${fileName} has been changed`)
		clearTimeout(timer)
		timer = setTimeout(() => {
			console.log('File change detected, running command')
			const stringDateTime = new Date().toUTCString()
			exec(
				`git fetch && git pull && git add . && git commit -m "updated at ${stringDateTime}" && git push`,
				(err, stdout, stderr) => {
					if (err) {
						console.error(err)
						return
					}
					console.log(stdout)
				}
			)
		}, 3000)
	}
})
