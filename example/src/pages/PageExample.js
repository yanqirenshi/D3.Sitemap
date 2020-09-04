import React from 'react';

import SitemapGraph from './SitemapGraph';

function PageExample () {
    const style = {
        root: {
            background: '#ffffff',
            width: '1024px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        graph_area: {
            marginTop: '22px',
            marginBottom: '22px',
        },
        h1: {
            fontSize: '33px',
            fontWeight: 'bold',
            marginTop: '11px',
        },
    };

    return (
        <div style={style.root}>

          <div>
            <h1 style={style.h1}>Example of React</h1>
          </div>

          <div style={style.graph_area}>
            <SitemapGraph />
          </div>

        </div>
    );
}

export default PageExample;
