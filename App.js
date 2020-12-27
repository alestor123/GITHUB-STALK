#!/usr/bin/env node

var figlet = require('figlet'),
axios = require('axios'),
username = process.argv[2] || 'github',
api = 'https://api.github.com/',
acts = ["WatchEvent","PushEvent","CreateEvent","PullRequestEvent","DeleteEvent","ForkEvent","IssueCommentEvent","PullRequestReviewCommentEvent","IssuesEvent","PublicEvent",],
chalk = require('chalk');
figlet('Github Stalk', (err,data) => {
if(err) throw err
console.log(chalk.green(data))
axios.get(api+'users/'+username).then((response) => {
    console.log(chalk.red('👤 : ' + username + ' AKA ' + response.data.name))
Info(response)
Lang()
Activity()
})
})
// functions logging info 
function Info(response){
    console.log(chalk.green('Bio : '+ response.data.bio ))
    console.log(chalk.green('Location : '+ response.data.location ))
    console.log(chalk.green('Web Page : '+ response.data.blog ))
    console.log(chalk.green('Work : '+ response.data.company ))
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
        console.log('\n'+chalk.green(languages.join(" "))+'\n');
})
}
function Activity() {
console.log(chalk.green.bgRed('\n Activity \n'))
    axios.get(api+'users/'+username+'/events').then((response) => {
response.data.filter((activity) => acts.includes(activity.type))
.slice(0, 7).map((activity) => console.log(Events(activity))
)})}
function Events(activity){
var repo = chalk.green(activity.repo.name)
        if(activity.type=="ForkEvent") return `${chalk.bold.redBright("Forked")} a repo from ${activity.payload.forkee.html_url}`;
        else if(activity.type=="PullRequestEvent")  return `${chalk.bold.yellowBright(activity.payload.action.charAt(0).toUpperCase() + activity.payload.action.slice(1))} a PR at https://github.com/${repo}`;
        else if("WatchEvent"==activity.type) return `${chalk.blue.bold("Starred")} https://github.com/${repo}`;
        else if("CreateEvent"==activity.type)return `${chalk.green.bold("Created")} a ${activity.payload.ref_type} at https://github.com/${repo}`;
        else if("DeleteEvent"==activity.type) return `${chalk.red.bold("Deleted")} a ${activity.payload.ref_type} at https://github.com/${repo}`;
        else if("IssuesEvent"==activity.type)return `${chalk.bold.red(activity.payload.action.charAt(0).toUpperCase() + activity.payload.action.slice(1))} an issue at https://github.com/${repo}`;
        else if("IssueCommentEvent"==activity.type)return `${chalk.bold.red(activity.payload.action.charAt(0).toUpperCase() + activity.payload.action.slice(1))} an issue at https://github.com/${repo}`;
        else if("PublicEvent"==activity.type)return `${chalk.green("Push")} https://github.com/${repo} public`;
        else if(activity.type='PushEvent') return `${chalk.bold.magenta("Pushed")} ${activity.payload.size} to https://github.com/${repo}`;
        else return "";
}
    
