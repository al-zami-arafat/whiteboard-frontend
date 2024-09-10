// src/utils/drawingUtils.js
export const drawLine = (ctx, x1, y1, x2, y2, strokeColor, strokeWidth) => {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

export const drawRectangle = (ctx, x, y, width, height, fillColor, strokeColor, strokeWidth) => {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
};

export const drawText = (ctx, text, x, y, color, font) => {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
};
