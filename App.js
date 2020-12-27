
var figlet = require('figlet'),
Box = require('cli-box'),
axios = require('axios'),
username = process.argv[2] || 'github',
api = 'https://api.github.com/',
chalk = require('chalk');
figlet('Github Stalk', (err,data) => {
if(err) throw err
console.log(chalk.green(data))
axios.get(api+'users/'+username).then((response) => {
    console.log(chalk.red('👤 : ' + username + ' AKA ' + response.data.name))
Info(response)
Lang()
})
})
// functions logging info 
function Info(response){
    console.log(chalk.green('Bio : '+ response.data.bio ))
    console.log(chalk.green('Location : '+ response.data.location ))
    console.log(chalk.green('Work : '+ response.data.company ))
    console.log(chalk.green('Web Page : '+ response.data.blog ))
    console.log(chalk.green('Twitter : '+ response.data.twitter_username ))
    console.log(chalk.green('Repos : '+ response.data.public_repos ))
    console.log(chalk.green('Gists : '+ response.data.public_gists ))
    console.log(chalk.green('Following : '+ response.data.following ))
    console.log(chalk.green('Followers: '+ response.data.followers ))
    console.log(chalk.green(`Hireable : ${response.data.hireable ? chalk.green("Yes") : chalk.red("No")}`))
}
function Lang(){
axios.get(api+'users/'+username+'/repos').then((response) => {
      let languages = response.data.map((repo) => repo.language);
        languages = languages.filter((a, b) => languages.indexOf(a) === b);
              console.log('🌈 ' + chalk.bold.yellow('Langs'));
        console.log(chalk.green(languages.join(" ")));
})
}