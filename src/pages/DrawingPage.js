// src/components/DrawingPage.js
import React, { useRef, useState, useEffect } from 'react';

const DrawingPage = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('line'); // Options: 'line', 'rectangle', 'text'
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext('2d');
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setStartPosition({ x: offsetX, y: offsetY });
        setIsDrawing(true);
        if (tool === 'text') {
            drawText('Hello', offsetX, offsetY);
        }
    };

    const finishDrawing = () => {
        setIsDrawing(false);
        contextRef.current.closePath();
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;

        if (tool === 'line') {
            drawLine(offsetX, offsetY);
        } else if (tool === 'rectangle') {
            drawRectangle(startPosition.x, startPosition.y, offsetX - startPosition.x, offsetY - startPosition.y);
        }
    };

    const drawLine = (x, y) => {
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
    };

    const drawRectangle = (x, y, width, height) => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas first
        contextRef.current.strokeRect(x, y, width, height);
    };

    const drawText = (text, x, y) => {
        contextRef.current.font = '24px Arial';
        contextRef.current.fillText(text, x, y);
    };

    return (
        <div>
            <div>
                <button onClick={() => setTool('line')}>Line</button>
                <button onClick={() => setTool('rectangle')}>Rectangle</button>
                <button onClick={() => setTool('text')}>Text</button>
            </div>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                style={{ border: '1px solid black' }}
            />
        </div>
    );
};

export default DrawingPage;
