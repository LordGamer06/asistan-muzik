const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

function getHelpEmbed() {
    const messageEmbed = new MessageEmbed()
        .setColor("#5865f2")
        .setTitle("<a:ara:984453612849754252>  Assistant Müzik Komutları  <a:mzik:1009425937596698644> ")
        .setAuthor({ name: "Assistant" })
        .setThumbnail("https://i.imgur.com/mKkSZOl.png")
        .setFields([
            {
                name: "`/play`",
                value: "Inputs: url or name or index",
                inline: false,
            },
            {
                name: "`/add`",
                value: "Inputs: url or name",
                inline: false,
            },
            {
                name: "`/bass`",
                value: "Inputs: values from 1 to 50",
                inline: false,
            },
            {
                name: "`/treble`",
                value: "Inputs: values from 1 to 50",
                inline: false,
            },
            {
                name: "`/voluma`",
                value: "Inputs: values from 1",
                inline: false,
            },
            {
                name: "`/seek`",
                value: "Inputs: In HH:MM:SS or MM:SS or SS formats",
                inline: false,
            },
            {
                name: "`/party`",
                value: "Inputs: select from options",
                inline: false,
            },
            {
                name: "Controls:",
                value: "`/pause` `/resume` `/next` `/list` `/clear` `/leave`",
            },
        ]);

    return messageEmbed;
}

function getListEmbed(data, i) {
    let fields = data.map((value, index) => {
        return {
            name:
                i === index
                    ? `➡  ${index + 1}: ` + value.name
                    : `${index + 1}: ` + value.name,
            value: value.link,
        };
    });

    const exampleEmbed = new MessageEmbed()
    .setColor("#5865f2")
        .setTitle(" Oynatma Listesindeki Müzikler ")
        .setAuthor({ name: "Assistant" })
        .setThumbnail("https://i.imgur.com/mKkSZOl.png")
        .setFields(fields);

    return exampleEmbed;
}

function getSingleMessageEmbed(type, name) {
    return new MessageEmbed()
        .setFields([
            {
                name: type,
                value: name,
            },
        ])
        .setColor("#5865f2");
}

function getPlayerButtons() {
    const row1 = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("pause")
            .setEmoji("⏸")
            .setLabel("Duraklat")
            .setStyle("PRIMARY"),
        new MessageButton()
            .setCustomId("resume")
            .setEmoji("▶")
            .setLabel("Devam")
            .setStyle("SUCCESS"),
        new MessageButton().setCustomId("next").setEmoji("⏭").setLabel("Atla").setStyle("DANGER")
    );

    const row2 = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("list")
            .setEmoji("📀")
            .setLabel("Liste")
            .setStyle("PRIMARY"),
        new MessageButton()
            .setCustomId("clear")
            .setEmoji("🧹")
            .setLabel("Temizle")
            .setStyle("SUCCESS"),
        new MessageButton()
            .setCustomId("leave")
            .setEmoji("⏹")
            .setLabel("Durdur")
            .setStyle("DANGER")
    );

    return [row1, row2];
}

module.exports = {
    getHelpEmbed,
    getListEmbed,
    getPlayerButtons,
    getSingleMessageEmbed,
};
