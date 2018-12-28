const _ROUTES = [
    {
        code: 'TOP-PAGE',
        name: 'トップ画面',
        type: 'PAGE',
        x: 10, y:10, w: 333, h:188,
        children: [
            {
                code: 'ENTRYED-RACE',
                name: 'エントリー済み大会',
                type: 'TAB',
                x: 55, y:55, w: 222, h:44,
                children: []
            },
            {
                code: 'PARTICIPATED-RACE',
                name: '出場済み大会',
                type: 'TAB',
                x: 55, y:111, w: 222, h:44,
                children: []
            },
        ]
    },
    {
        code: 'PASSCODE-TARGET-RACES',
        name: 'RUN PASSコード対象大会一覧画面',
        type: 'PAGE',
        x: 555, y:10, w: 333, h:111,
        children: []
    },
];

const _TRANSITIONS = [
    {
        from: { code: 'TOP-PAGE' },
        to: { code: 'PASSCODE-TARGET-RACES' },
    },
];
