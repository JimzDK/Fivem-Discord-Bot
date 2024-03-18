const {ApplicationCommandOptionType} = require('discord.js');
const TempplateMessage = {
    karakter: "**Karakter Skabelon**\nAntal Karaktere i forvejen:\nNavn på din nye karakter:\nBaggrundshistorie på din nye karakter:\nHvorfor vil du gerne lave en ny karakter?",
    firma: "**Firma Skabelon**\nDiscord navne samt alder (alder 16+):\nNavn på virksomheden:\nHvad laver/gør virksomheden?\nHvad er formålet med din virksomhed?\nHvorfor ville du gerne have en virksomhed?\nHar du erfaringer med emnet?\nHar du tidligere haft en chef stilling?\nKarakter baggrund (Cheferne):",
    bande: "**Bande Skabelon**\nIRL navne? [På alle Bande Ledere]\nIRL alder? [På alle Bande Ledere]\nDiscord navne? [navn####]  [På alle Bande Ledere]\nDiscord navne? [navn####]  [På alle medlemmer]\nMedlemmernes irl alder? [Eks: 16, 16, 16 & 16]:\nHvad hedder banden?\nHvor mange medlemmer har i? [Info: Max 18, mindst 6]\nBandens Historie? [Uddyb gerne]\nHvorfor ville i gerne have en bande?\nHvorfor skal vi vælge jer?\nHvilke type bande?",
    auktion: "**AUKTION - BUD**\n\nDit ingame navn:\nDit discord tag:\n\nHvilket firma vil du købe?\nHvorfor vil du gerne eje firmaet?\nHvad er dine fremtidsplaner med firmaet?\n\nHvad ligger dit bud på?",
    unban: "**UFDYLD VENLIGST NEDENSTÅENDE SKABELON OG AFVENT DERNÆST TÅLMODIGT, PÅ FORHÅND TAK!**\n\n\nHvorfor er du blevet **BANNED**?\n\nHvorfor ønsker du at få **UNBAN**?\n\nIndsend venligst et billede af dit **BAN** (Hvad der kommer frem på skærmen, når du forsøger at tilslutte serveren.)\n\nVÆR OBS! - Tjek venligst <#1126139576008855662> kanalen, inden du ansøger.",
    ck: "**CK Skabelon**\nVedkommendes ingame navn:\nOplysninger til sagen:\nÅrsag til CK:\nVideobevis (påkrævet for CK):\nJeres relation:"
}

module.exports = {
    name: 'tempplate',
    deleted: false,
    description: 'Få botten til at skrive en skabelon til unban, firma eller andet!',
    roleRequired: [
        'example1', // Admin
    ],
    options: [
        {
            name: 'type',
            description: 'Hvilken skabelon skal sendes?',
            required: true,
            choices: [
                {
                    name: 'Karakter Skabelon',
                    value: 'karakter',
                },
                {
                    name: 'Firma Skabelon',
                    value: 'firma',
                },
                {
                    name: 'Bande Skabelon',
                    value: 'bande',
                },
                {
                    name: 'Auktions Skabelon',
                    value: 'auktion',
                },
                {
                    name: 'Unban Skabelon',
                    value: 'unban',
                },
                {
                    name: 'CK Skabelon',
                    value: 'ck',
                },
                {
                    name: 'CK Skabelon2',
                    value: 'ck2',
                },
            ],
            type: ApplicationCommandOptionType.String,
        },
    ],
    callback: async (_, interaction) => {
        const type = interaction.options.get('type').value;
        interaction.reply(TempplateMessage[type] ? TempplateMessage[type] : 'Denne skabelon findes ikke..');
    }
};