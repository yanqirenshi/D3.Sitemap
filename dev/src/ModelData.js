import React from 'react';

import Box from '@mui/material/Box';
import S from '@mui/material/Typography';

export default function ModelData () {
    return (
        <Box>
          <S variant="h5">Data Model</S>
          <Box>
            <pre>{model.join('\n')}</pre>
          </Box>
        </Box>
    );
}

const model = [
    '+------------------+     +-----------------------+',
    '| Node        | RS |--+--| Children        | Ref |',
    '|==================|  `--|=======================|',
    '| ID | Name        |     | Node ID parent |      |',
    '|    | Description |     | Node ID child  |      |',
    '|    |             |     +-----------------------+',
    '|    | <Position>  |',
    '|    |  x          |',
    '|    |  y          |',
    '|    |             |',
    '|    | <Size>      |',
    '|    |  w          |',
    '|    |  h          |         +----------------------------------+',
    '+------------------+         | Transition                 | HDR |',
    '  |                          |==================================|',
    '  +------------------------->| Node ID (From) | Description     |',
    '  `------------------------->| Node ID (To)   |                 |',
    '  +------------------------->| Event ID       | <Port position> |',
    '  |                          |                |  From           |',
    '+------------------+         |                |  To             |',
    '| Event       | RS |         |                |                 |',
    '|==================|         |                | <Stroke>        |',
    '| ID | Name        |         |                |  color          |',
    '|    | Description |         |                |  width          |',
    '+------------------+         |                |                 |',
    '                             |                | <Label>         |',
    '                             |                |  contents       |',
    '                             |                |  position x     |',
    '                             |                |  position y     |',
    '                             |                |                 |',
    '                             |                | <Label Font>    |',
    '                             |                |  font size      |',
    '                             |                |  font color     |',
    '                             +----------------------------------+',
];
