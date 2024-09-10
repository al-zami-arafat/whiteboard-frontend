// src/components/Toolbar.js
import React from 'react';

const Toolbar = ({ tool, setTool }) => {
    return (
        <div>
            <button onClick={() => setTool('line')} className={tool === 'line' ? 'active' : ''}>Line</button>
            <button onClick={() => setTool('rectangle')} className={tool === 'rectangle' ? 'active' : ''}>Rectangle</button>
            <button onClick={() => setTool('text')} className={tool === 'text' ? 'active' : ''}>Text</button>
        </div>
    );
};

export default Toolbar;
