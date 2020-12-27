var figlet = require('figlet'),
chalk = require('chalk');
figlet('Github Stalk', (err,data) => {
    if(err) throw err
    console.log(chalk.green(data))
})