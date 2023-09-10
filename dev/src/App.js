import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import S from '@mui/material/Typography';

import ModelInputData from './ModelInputData.js';
import ModelData from './ModelData.js';
import ModelObject from './ModelObject.js';

import D3Deployment, { Rectum } from './lib/index.js';

import NODE_DATA from './data/NODE_DATA.js';
import EDGE_DATA from './data/EDGE_DATA.js';

const rectum = new Rectum({
    transform: {
        k: 1.0,
        x: 0.0,
        y: 0.0,
    },
});

const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    graph_area: {
        width:  777 + (22*2),
        height: 300 + (22*2),
        background: '#eee',
        padding: 22,
        borderRadius: 5,
    },
};

export default function App() {
    const [graph_data] = useState({
        nodes: NODE_DATA,
        edges: EDGE_DATA,
    });

    useEffect(()=> rectum.data(graph_data), [graph_data]);

    return (
        <Box>
          <Container maxWidth="md" sx={{pt: 3, pb: 22}}>
            <Box style={style.graph_area}>
              <D3Deployment rectum={rectum} />
            </Box>

            <Box sx={{mt:6}}>
              <ModelInputData/>
            </Box>

            <Box sx={{mt:6}}>
              <ModelData/>
            </Box>

            <Box sx={{mt:6}}>
              <ModelObject/>
            </Box>
          </Container>
        </Box>
    );
}
