var figlet = require('figlet'),
axios = require('axios'),
username = process.argv[2],
api = 'https://api.github.com/'
chalk = require('chalk');
figlet('Github Stalk', (err,data) => {
if(err) throw err
console.log(chalk.green(data))
axios.get(api+'users/'+username).then((response) => {
    console.log(chalk.red('👤 : ' + username + ' AKA ' + response.data.name))
})
})