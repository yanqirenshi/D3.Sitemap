import React from 'react';

import Box from '@mui/material/Box';
import S from '@mui/material/Typography';

export default function ModelInputData () {
    return (
        <Box>
          <S variant="h5">Input Data Model</S>
          <Box>
            <pre>{mode.join('\n')}</pre>
          </Box>
        </Box>
    );
}

const mode = [
    '                         +---------------+',
    '                     +---| Label         |',
    '                     |   |===============|',
    '+---------------+    |   | contents  str |',
    '| Node          |    |   | position      |<---+   +------------+',
    '|===============|    |   | font          |<---|---| Font       |',
    '| id        num |    |   +---------------+    |   |============|',
    '| type      str |    |                        |   | size   num |',
    '| label         |<---+   +-----------+        |   | color  str |',
    '| size          |<-------| Rectangle |--------+   +------------+',
    '| position      |<---+   |===========|',
    '| children  arr |    |   | x     num |',
    '+---------------+    |   | y     num |',
    '                     |   +-----------+',
    '                     |',
    '                     |   +--------+',
    '                     `---| vector |',
    '                         |========|',
    '                         | x  num |',
    '                         | y  num |',
    '                         +--------+',
    '',
    '+-------------+',
    '| Edge        |',
    '|=============|',
    '| id      num |        +---------------+',
    '| from        |<-------| Port          |',
    '| to          |<-------|===============|',
    '| stroke      |<---+   | id        num |',
    '+-------------+    |   | position  num |',
    '                   |   +---------------+',
    '                   |',
    '                   |   +------------+',
    '                   `---| Stroke     |',
    '                       |============|',
    '                       | color  str |',
    '                       | width  num |',
    '                       +------------+',
];

const node = {
    id: 3,
    type: 'NODE',
    label: {
        contents: 'NODE 03',
        position: { x: 20, y: 20 },
        font: { size: 16, color: '#333333' },
    },
    size: { w:100, h:100 },
    position: { x:100, y:100 },
    children: [],
};

const edge = {
    id: 100,
    from: {
        id: 1,
        position: 270,
    },
    to: {
        id: 2,
        position: 90,
    },
    stroke: {
        color: '#f00',
        width: 1.5,
    },
};
