// src/components/DrawingBoard.js
import React, { useRef, useState } from 'react';
import Toolbar from './Toolbar';
import { drawLine, drawRectangle, drawText } from '../utils/drawingUtils';

const DrawingBoard = ({ drawing, onSave }) => {
    const canvasRef = useRef(null);
    const [tool, setTool] = useState('line');  // line, rectangle, text
    const [elements, setElements] = useState(drawing.elements || []);

    const handleMouseDown = (e) => {
        const ctx = canvasRef.current.getContext('2d');
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        switch (tool) {
            case 'line':
                drawLine(ctx, x, y, x + 100, y + 100, '#000', 2);
                setElements([...elements, { elementType: 'line', position: { x, y }, line: { points: [{ x, y }, { x: x + 100, y: y + 100 }], strokeColor: '#000', strokeWidth: 2 } }]);
                break;
            case 'rectangle':
                drawRectangle(ctx, x, y, 100, 50, '#00ff00', '#000', 1);
                setElements([...elements, { elementType: 'shape', position: { x, y }, shape: { shapeType: 'rectangle', dimensions: { width: 100, height: 50 }, fillColor: '#00ff00', strokeColor: '#000', strokeWidth: 1 } }]);
                break;
            case 'text':
                drawText(ctx, 'Hello', x, y, '#ff00ff', '24px Arial');
                setElements([...elements, { elementType: 'text', position: { x, y }, text: { content: 'Hello', fontSize: 24, fontFamily: 'Arial', color: '#ff00ff' } }]);
                break;
            default:
                break;
        }
    };

    const handleSave = () => {
        onSave(elements);
    };

    return (
        <div>
            <Toolbar tool={tool} setTool={setTool} />
            <canvas
                ref={canvasRef}
                width="800"
                height="600"
                onMouseDown={handleMouseDown}
                style={{ border: '1px solid black' }}
            />
            <button onClick={handleSave}>Save Drawing</button>
        </div>
    );
};

export default DrawingBoard;
