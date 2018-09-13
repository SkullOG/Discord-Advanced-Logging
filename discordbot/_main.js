const Discord = require('discord.js');
const client = new Discord.Client();
const { botToken } = require('./config.json');

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
    logs.send('',
        {
            "embed":
            {
                "color": 0x921515,
                "fields":
                [{
                    "name": "Member",
                    "value": message.author
                },
                {
                    "name": "Channel",
                    "value": message.channel
                },
                {
                    "name": "Message",
                    "value": message.content
                }]
            }
        })
    client.on("error", (e) => {
        console.error(e);
    });

    client.on("warn", (e) => {
        console.warn(e);
    });

    client.on("debug", (e) => {
        console.info(e);
    });
})

client.login(botToken)