export default {
    game: {
        title: 'Tic Tac Toe ⭕❌',
        mode: 'Modus',
        difficulty: 'Difficultas',
        player: 'Ludens',
        selectMode: 'Selectio Modus Ludendi',
        selectPlayer: 'Selectio Tui Symboli',
        selectDifficulty: 'Selectio Difficultatis AI',
        currentTurn: "Ludi {player} tempus",
        winner: 'Ludens {player} vincit!',
        draw: "Aequitas est!",
        resetButton: 'Reset Ludum',
        changeSettings: 'Mutare Instar',
        back: 'Revertere',
        next: 'Proximum',
        start: 'Incipe Ludum',
        modes: {
            ai: 'vs AI',
            pvp: '2 Ludentium',
        },
        difficulties: {
            easy: 'Facile',
            medium: 'Medium',
            hard: 'Difficile'
        }
    },
    tabs: {
        stats: 'Statisticae',
        achievements: 'Adipiscenda',
        themes: 'Themata',
        settings: 'Instar'
    },
    stats: {
        title: 'Statisticae',
        playerStats: 'Statistica Ludi',
        drawStats: 'Statistica Aequationis',
        aiStats: 'Statistica AI',
        difficultyStats: 'Statistica Difficultatis',
        overallStats: 'Statistica Generalis',
        xWins: 'X Vincit',
        oWins: 'O Vincit',
        draws: 'Aequitates',
        lost: 'Amissis AI',
        wins: 'Vincit AI',
        totalGames: 'Ludi Totales',
        winRate: 'Ratio Victoriae',
        easyWins: 'Vincit Facile',
        mediumWins: 'Vincit Medium',
        hardWins: 'Vincit Difficile',
    },
    themes: {
        title: 'Themata',
        default: 'Defaultum',
        neon: 'Neon',
        cyberpunk: 'Cyberpunk',
        nature: 'Natura',
        sunset: 'Occasus Solis',
        galaxy: 'Galaxia',
        candy: 'Dulcia',
        retro: 'Konami',
        thanksgiving: 'Gratitudinis Dies',
        halloween: 'Halloween',
        christmas: 'Natalis Dies',
        tropical: 'Tropicalis Festa',
        medieval: 'Aetas Mediaevalis',
        space: 'Spatium Externum',
        locked: 'Clausum',
        unlocked: 'Apertum',
        unlockHint: 'Perge ludere ut aperias!',
    },
    achievements: {
        title: 'Adipiscenda',
        sections: {
            mastery: 'Dominatio Ludi',
            experience: 'Experientia',
            aiChallenges: 'Provocationes AI',
            difficulty: 'Difficultatis Conquestus'
        },
        masterX: {
            name: 'Magister X',
            description: 'Vince 3 ludos ut X'
        },
        masterO: {
            name: 'Magister O',
            description: 'Vince 3 ludos ut O'
        },
        peacemaker: {
            name: 'Pacifex',
            description: 'Aequitate 3 obtine'
        },
        veteran: {
            name: 'Veteranus',
            description: 'Lude 10 ludos'
        },
        expert: {
            name: 'Peritus',
            description: 'Lude 15 ludos'
        },
        balanced: {
            name: 'Aequabilis',
            description: 'Obtine 5 victoriae cum unoquoque ludentium'
        },
        aiShooter: {
            name: 'AI Pugilator',
            description: 'Obtine 5 victoriae contra AI'
        },
        aiKiller: {
            name: 'AI Interfector',
            description: 'Obtine 10 victoriae contra AI'
        },
        aiMaster: {
            name: 'AI Magister',
            description: 'Obtine 15 victoriae contra AI'
        },
        easyPeasy: {
            name:'Facile Facile',
            description:'Obtine 7 victoriae contra AI in facilis difficultate'
        },
        mediumBreezy:{
            name:'Medium Ventosus',
            description:'Obtine 15 victoriae contra AI in media difficultate'
        },
        hardAsHell:{
            name:'Difficile ut Infernum',
            description:'Obtine 15 victoriae contra AI in difficili difficultate'
        },
    },
    settings:{
        title:'Instar',
        language:{
            title:'Lingua',
            en:'Anglica',
            es:'Hispanica',
            fr:'Gallica',
            it:'Italica',
            de:'Theodisce',
            pt:'Portugallensis',
            la:'Latin',
        },
        data:{
            title:'Data Ludi',
            description:'Delete omnia progressus, inclusa statisticis et thematibus aperta',
            deleteButton:'Delete Data',
            confirmTitle:'Delete omnia data?',
            confirmDescription:'Haec actio omnes statisticas et themata aperta perpetuo delebit. Haec actio non potest revocari.',
            confirmButton:'Ita, delete data',
            cancelButton:'Cancel'
        },
        info:{
            title:'Informatiuncula',
            version:'Versio:',
            developer:'Auctore'
        }
    }
}