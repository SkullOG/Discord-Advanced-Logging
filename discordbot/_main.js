const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
const { botToken } = require('./edit.json');

client.on('ready', () => {
    console.log('Ready!');
});

client.on('messageDelete', message => {
  const logs = message.guild.channels.find('name', 'logs');
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('logs', 'text');
  }
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
      console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
    } 
    let msgContent = ''

    if (message.content.length > 0) {
        msgContent = msgContent + message.content
    }

    if (message.attachments.array().length > 0) {
        msgContent = msgContent + '\n' + message.attachments.array()[0].proxyURL
    }

    const embed = {
        "embed": {
            "color": 0xd05333,
            "title": `Message Removed`,
            'fields': [
                {
                    'name': 'Member:',
                    'value': `${message.author}`,
                    'inline': true
                },
                {
                    'name': 'Channel:',
                    'value': `${message.channel}`,
                    'inline': true
                },
                {
                    'name': 'Message:',
                    'value': `${msgContent}`
                },

            ],
            footer: {
                'text': "Member ID: " + message.id + "  |  " + moment(message.createdAt).format('DD-MM-Y hh:mm:ss A')
            }
        }
    }
logs.send(embed)

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

client.on('guildMemberAdd', join => {
    console.log(join.user)
    const date = new Date()
    const logs = join.guild.channels.find('name', 'logs');

    const embed = {
        "embed": {
            "color": 0x19bf0a,
            'fields': [
                {
                    'name': 'Member Joined',
                    'value': `${join.user}`
                }
            ],
            footer: {
                'text': `${moment(date).format('DD-MM-Y hh:mm:ss A')}`
            }
        }
    }
    logs.send(embed)
})

client.on('guildMemberRemove', leave => {
    console.log(leave.user)
    const date = new Date()
    const logs = leave.guild.channels.find('name', 'logs');

    const embed = {
        "embed": {
            "color": 0xd05333,
            'fields': [
                {
                    'name': 'Member Left',
                    'value': `${leave.user}`
                }
            ],
            footer: {
                'text': `${moment(date).format('DD-MM-Y hh:mm:ss A')}`
            }
        }
    }
    logs.send(embed)
})

client.on('messageUpdate', (eold, enew) => {
    if (enew.author.username === client.user.username) return
    console.log(enew)
    const date = new Date()
    const logs = enew.guild.channels.find('name', 'logs');

    const embed = {
        "embed": {
            "color": 0x1674ae,
            "title": `Message Changed`,
            'fields': [
                {
                    'name': 'Member',
                    'value': `${enew.author}`,
                    'inline': true
                },
                {
                    'name': 'Channel',
                    'value': `${enew.channel}`,
                    'inline': true
                },
                {
                    'name': 'Old Message',
                    'value': `${eold.content}`
                },
                {
                    'name': 'New Message',
                    'value': `${enew.content}`
                }
            ],
            footer: {
                'text': `${moment(date).format('DD-MM-Y hh:mm:ss A')}`
            }
        }
    }
    logs.send(embed)
})

client.on('guildMemberUpdate', (ous, nus) => {
    console.log(ous)
    const date = new Date()
    const logs = ous.guild.channels.find('name', 'logs');

    const embed = {
        "embed": {
            "color": 0x1674ae,
            "title": `Name Changed`,
            'fields': [
                {
                    'name': 'Old Name',
                    'value': `${ous.nickname || ous.user.username}`,
                    'inline': true
                },
                {
                    'name': 'New Name',
                    'value': `${nus.nickname || nus.user.username}`,
                    'inline': true
                },
            ],
            footer: {
                'text': `${moment(date).format('DD-MM-Y hh:mm:ss A')}`
            }
        }
    }
    logs.send(embed)
})


client.login(botToken)