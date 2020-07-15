import React, { useState, useEffect } from 'react';

import D3Sitemap from '@yanqirenshi/d3.sitemap';

import NODE_DATA from '../data/NODE_DATA.js';
import EDGE_DATA from '../data/EDGE_DATA.js';

function SitemapGraph (props) {
    const [d3sitemap] = useState(new D3Sitemap().init({
        svg: {
            selector: '#sitemap-graph',
            w: 1024,
            h: 333,
        },
    }));

    useEffect(() => {
        d3sitemap.data({
            nodes: NODE_DATA,
            edges: EDGE_DATA,
        });
    });

    const style = {
        root: {
            background: '#f3f3f3',
            width: '100%',
            height: '333px',
        },
        operators: {
            marginTop: '11px',
        },
    };

    return (
        <>
          <div style={style.root}>
            <svg id='sitemap-graph'
                 width='1024px'
                 height='333px' />

          </div>
          <div style={style.operators}>
          </div>
        </>
    );
}

export default SitemapGraph;
