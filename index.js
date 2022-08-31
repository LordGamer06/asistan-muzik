require("dotenv").config();
const play = require("play-dl");
const commands = require("./commands");
const { Client } = require("discord.js");
const Player = require("./classes/Player");
const { DiscordTogether } = require("discord-together");

play.setToken({
    spotify: {
        client_id: "915339116332326972",
        client_secret: "lZ7R2gD4-gTwhnGqkBxboxDUjKMIYjZC",
        refresh_token: "OTE1MzM5MTE2MzMyMzI2OTcy.Gs7t_F.VbMfG_ydefVZbmnR4VY_Q39LiI3Bqeq5OqMTJk",
        market: "IN",
    },
});

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
});

client.discordTogether = new DiscordTogether(client);
const player = new Player();

client.once("ready", () => {
    console.log("Connected on: " + Date());
    client.user.setStatus("idle");
    client.application.commands.set(commands);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.guildId) return;

    if (interaction.isCommand()) {
        player.setInteraction(interaction);

        try {
            switch (interaction.commandName) {
                case "help":
                    player.help();
                    break;
                case "play":
                    player.playSong();
                    break;
                case "add":
                    player.addSong();
                    break;
                case "next":
                    player.playNextSong();
                    break;
                case "list":
                    player.displayQueue();
                    break;
                case "pause":
                    player.pauseSong();
                    break;
                case "resume":
                    player.resumeSong();
                    break;
                case "clear":
                    player.clearQueue();
                    break;
                case "leave":
                    player.destroy();
                    break;
                case "bass":
                    player.setBass();
                    break;
                case "treble":
                    player.setTreble();
                    break;
                case "volume":
                    player.setVolume();
                    break;
                case "seek":
                    player.seek();
                    break;
                case "partytogether":
                    if (!interaction.member.voice.channel)
                        return interaction.reply(
                            "Lütfen bir ses kanalına katılın"
                        );

                    let voicechannel = interaction.member.voice.channel.id;
                    let option =
                        interaction.options.getString("party-together");

                    client.discordTogether
                        .createTogetherCode(voicechannel, option)
                        .then(async (invite) => {
                            interaction.reply(
                                `İşte bağlantı: ${invite.code}  `
                            );
                        });
                    break;
            }
        } catch (e) {
            console.log(Date(), e);
        }
    } else if (interaction.isButton()) {
        try {
            player.setInteraction(interaction);

            if (!player.state.get(interaction.guildId))
                return interaction.update({
                    content: "Etkileşim süresi doldu!",
                    embeds: [],
                    components: [],
                });

            switch (interaction.customId) {
                case "pause":
                    player.pauseSong(true);
                    break;
                case "resume":
                    player.resumeSong(true);
                    break;
                case "next":
                    player.playNextSong(true);
                    break;
                case "list":
                    player.displayQueue(true);
                    break;
                case "clear":
                    player.clearQueue(true);
                    break;
                case "leave":
                    player.destroy(true);
                    break;
            }
        } catch (e) {
            console.log(Date(), e);
        }
    }
});

client.login("OTE1MzM5MTE2MzMyMzI2OTcy.Gs7t_F.VbMfG_ydefVZbmnR4VY_Q39LiI3Bqeq5OqMTJk");
