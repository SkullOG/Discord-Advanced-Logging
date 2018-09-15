const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
const { botToken } = require('./config.json');

client.on('ready', () => {
    console.log('Ready!');
});

client.on('messageDelete', message => {
    const date = new Date()
    console.log(`[${moment(date).format('DD-MM-Y hh:mm: A')}][${message.guild.name}] User ${message.author.tag} has been deleted`)
    const logs = message.guild.channels.find(x => x.name === "logs");
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    if (message.author.bot) return
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
    const date = new Date()
    console.log(`[${moment(date).format('DD-MM-Y hh:mm: A')}][${join.guild.name}] User ${join.user.tag} has joined the server.`)
    const logs = join.guild.channels.find(x => x.name === "logs");
    if (join.author.bot) return

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
    const date = new Date()
    console.log(`[${moment(date).format('DD-MM-Y hh:mm: A')}][${leave.guild.name}] User ${leave.user.tag} has left the server.`)
    const logs = leave.guild.channels.find(x => x.name === "logs");
    if (leave.author.bot) return

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
    const date = new Date()
    console.log(`[${moment(date).format('DD-MM-Y hh:mm: A')}][${eold.guild.name}] User ${eold.author.tag} has uptaded their message.`)
    const logs = enew.guild.channels.find(x => x.name === "logs");
    if (eold.author.bot) return

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
    const oldNick = ous.nickname || ous.user.username
    const newNick = nus.nickname || nus.user.username
    if (oldNick === newNick) return
    const date = new Date()
    console.log(`[${moment(date).format('DD-MM-Y hh:mm: A')}][${nus.guild.name}] User ${nus.user.tag} has changed their nickname.`)
    const logs = ous.guild.channels.find(x => x.name === "logs");
    if (ous.author.bot) return

    const embed = {
        "embed": {
            "color": 0x1674ae,
            "title": `Name Changed`,
            'fields': [
                {
                    'name': 'Old Name',
                    'value': `${oldNick}`,
                    'inline': true
                },
                {
                    'name': 'New Name',
                    'value': `${newNick}`,
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