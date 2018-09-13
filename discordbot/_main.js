const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
});

client.on('messageDelete', (message) => {
  const logs = message.guild.channels.find('name', 'logs');
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('logs', 'text');
  }
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
    console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
  }  
    logs.send(`A message was deleted in ${message.channel.name} by ${message.author} \n Content: ${message.content}`);
})

client.on('message', (message) => {
    if (message.content === "!ping") {
        message.channel.send('Test')
    }

})


client.login('NDg5Nzk3MTc5NjI0NjUyODEy.Dnv-uA.1uaARfqmClq2waksEHE_SEwEKIc')