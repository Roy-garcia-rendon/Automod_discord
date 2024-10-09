const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
    .setName('automod')
    .setDescription('Setup the automod system')
    .addSubcommand(command => command.setName('flagged-words').setDescription('block profanity, sexual content and slurs'))
    .addSubcommand(command => command.setName('spam-messages').setDescription('block messages suspected of spam'))
    .addSubcommand(command => command.setName('mention-spam').setDescription('Block messages containing a certain amount of mentions').addIntegerOption(option => option.setName('number').setDescription('The number of mentions required to block a message').setRequired(true).setMinValue(1).setMaxValue(49)))
    .addSubcommand(command => command.setName('keyword').setDescription('block a given keyword in the server').addStringOption(option => option.setName('word').setDescription('The word you want to block').setRequired(true))),

    async execute (interaction) {

        const { guild, options} = interaction;
        const sub = options.getSubcommand();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You dont have perms to setup automod!', ephermal: true})

        switch (sub) {
                case 'flagged-words':


                await interaction.reply({ content: ':yellow_circle:  loading your automod rule...'});

                const rule = await guild.autoModerationRules.create({
                    name: 'Block profanity, Sexual content and slurs by Duckego Bot',
                    creatorId: '1100529816219955240',
                    enabled: true,
                    eventType: 1,
                    triggerType: 4,
                    triggerMetadata: 
                    {
                        presets:[1 , 2 , 3]
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                custommessage: 'This message was prevented by Duckego Bot  Auto Moderation'
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}`});
                    }, 2000)
                })

                setTimeout(async () => {
                    if(!rule) return;


                    const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(':white_check_mark: **PLEASE ONLY SETUP THIS ONE TIME** Your Automod Rule has been Created - All Swears will be stopped by Duckego Bot **To disable this go to Safety setup section and disable it manually**')

                    await interaction.editReply({ content: '', embeds: [embed]});
                }, 3000 )

                break;

                case 'keyword':

                await interaction.reply({ content: ':yellow_circle:  loading your automod rule...'});
                const word = options.getString('word')

                const rule2 = await guild.autoModerationRules.create({
                    name: `prevent the word **${word}** from being used by Duckego Bot`,
                    creatorId: '1100529816219955240',
                    enabled: true,
                    eventType: 1,
                    triggerType: 1,
                    triggerMetadata: 
                    {
                        keywordFilter: [`${word}`]
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                custommessage: 'This message was prevented by Duckego Bot Auto Moderation'
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}`});
                    }, 2000)
                })

                setTimeout(async () => {
                    if(!rule2) return;

                    const embed2 = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`:white_check_mark: **PLEASE ONLY SETUP THIS FIVE TIMES** Your Automod Rule has been Created - All messages containing the word **${word}** Will be deleted **To disable this go to Safety setup section and disable it manually** `)

                    await interaction.editReply({ content: '', embeds: [embed2]});
                }, 3000 )

                break;

                case 'spam-messages':

                await interaction.reply({ content: ':yellow_circle:  loading your automod rule...'});
                const rule3 = await guild.autoModerationRules.create({
                    name: `prevent spam messages by Duckego Bot`,
                    creatorId: '1100529816219955240',
                    enabled: true,
                    eventType: 1,
                    triggerType: 3,
                    triggerMetadata: 
                    {
                        //mentionTotalLimit: number
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                custommessage: 'This message was prevented by Duckego Bot Auto Moderation'
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}`});
                    }, 2000)
                })

                setTimeout(async () => {
                    if(!rule3) return;


                    const embed3 = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`:white_check_mark: **PLEASE ONLY SETUP THIS ONE TIME** Prevented spam messages by Duckego Bot **To disable this go to Safety setup section and disable it manually** `)

                    await interaction.editReply({ content: '', embeds: [embed3]});
                }, 3000 )


                break;

                case 'mention-spam':


                await interaction.reply({ content: ':yellow_circle:  loading your automod rule...'})
                const number = options.getInteger('number');


                const rule4 = await guild.autoModerationRules.create({
                    name: `prevent spam mentions by Duckego Bot`,
                    creatorId: '1100529816219955240',
                    enabled: true,
                    eventType: 1,
                    triggerType: 5,
                    triggerMetadata: 
                    {
                        mentionTotalLimit: number
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                custommessage: 'This message was prevented by Duckego Bot Auto Moderation'
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}`});
                    }, 2000)
                })

                setTimeout(async () => {
                    if(!rule4) return;
                    const embed4 = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`:white_check_mark: **PLEASE ONLY SETUP THIS ONE TIME** Spam messages will be deleted by Duckego Bot **To disable this go to Safety setup section and disable it manually**`)

                    await interaction.editReply({ content: '', embeds: [embed4]});
                }, 3000 )





        }

    }
}