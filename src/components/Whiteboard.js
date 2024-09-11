import React, { useLayoutEffect } from 'react'
import rough from 'roughjs/bundled/rough.esm'
import { useEffect, useState } from 'react'

const roughGenerator = rough.generator()

const Whiteboard = ({ canvasRef, ctxRef, elements, setElements, tool, color, setColor }) => {
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            canvas.width = 2 * window.innerWidth
            canvas.height = 2 * window.innerHeight

            const ctx = canvas.getContext("2d")
            ctx.strokeStyle = color
            ctx.lineWidth = 2
            ctx.lineCap = "round"
            ctxRef.current = ctx
        }
    }, [])

    useEffect(() => {
        if (canvasRef.current)
            ctxRef.current.strokeStyle = color
    }, [color])

    const [isDrawing, setIsDrawing] = useState(false)



    useLayoutEffect(() => {
        if (canvasRef.current) {
            const roughCanvas = rough.canvas(canvasRef.current)

            if (elements.length > 0) {
                ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }



            elements.forEach((element) => {


                if (element.type === "line") {
                    roughCanvas.draw(
                        roughGenerator.line(
                            element.offsetX,
                            element.offsetY,
                            element.width,
                            element.height,
                            {
                                stroke: element.color,
                                strokeWidth: 3,
                                roughness: 0
                            }
                        )
                    )
                }
                else if (element.type === "pencil") {
                    roughCanvas.linearPath(element.path,
                        {
                            stroke: element.color,
                            strokeWidth: 3,
                            roughness: 0
                        });
                }
                else if (element.type === "rectangle") {
                    roughCanvas.draw(
                        roughGenerator.rectangle(
                            element.offsetX,
                            element.offsetY,
                            element.width,
                            element.height,
                            {
                                stroke: element.color,
                                strokeWidth: 3,
                                roughness: 0
                            }
                        )
                    )
                }
                else if (element.type === "ellipse") {
                    roughCanvas.draw(
                        roughGenerator.ellipse(
                            element.offsetX,
                            element.offsetY,
                            element.width,
                            element.height,
                            {
                                stroke: element.color,
                                strokeWidth: 3,
                                roughness: 0
                            }
                        )
                    )
                }
                else if (element.type === "circle") {
                    roughCanvas.draw(
                        roughGenerator.circle(
                            element.offsetX,
                            element.offsetY,
                            element.center,
                            {
                                stroke: element.color,
                                strokeWidth: 3,
                                roughness: 0
                            }
                        )
                    )
                }
            })
        }
    }, [elements])


    function handleMouseDown(e) {
        const { offsetX, offsetY } = e.nativeEvent;
        if (tool === "pencil") {
            setElements(prevElements => [
                ...prevElements,

                {
                    type: "pencil",
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    color
                }])
        }
        else if (tool === "line") {
            setElements(prevElements => [
                ...prevElements,
                {
                    type: "line",
                    offsetX,
                    offsetY,
                    height: offsetY,
                    width: offsetX,
                    color
                }])

        }
        else if (tool === "rectangle") {
            setElements(prevElements => [
                ...prevElements,
                {
                    type: "rectangle",
                    offsetX,
                    offsetY,
                    height: 0,
                    width: 0,
                    color
                }])

        }
        else if (tool === "ellipse") {
            setElements(prevElements => [
                ...prevElements,
                {
                    type: "ellipse",
                    offsetX,
                    offsetY,
                    height: 0,
                    width: 0,
                    color
                }])

        }
        else if (tool === "circle") {
            setElements(prevElements => [
                ...prevElements,
                {
                    type: "circle",
                    offsetX,
                    offsetY,
                    center: 0,
                    color
                }])

        }

        setIsDrawing(true);

    }

    function handleMouseUp(e) {
        setIsDrawing(false);
    }

    function handleMouseMove(e) {
        const { offsetX, offsetY } = e.nativeEvent;

        if (isDrawing) {
            if (tool === "pencil") {
                const { path } = elements[elements.length - 1]
                const newPath = [...path, [offsetX, offsetY]]

                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                path: newPath,
                            };
                        } else {
                            return ele;
                        }
                    })
                )
            }
            else if (tool === "line") {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                height: offsetY,
                                width: offsetX
                            };
                        } else {
                            return ele;
                        }
                    })
                )
            }
            else if (tool === "rectangle") {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                height: offsetY - ele.offsetY,
                                width: offsetX - ele.offsetX
                            };
                        } else {
                            return ele;
                        }
                    })
                )

            }
            else if (tool === "ellipse") {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                height: offsetY - ele.offsetY,
                                width: offsetX - ele.offsetX
                            };
                        } else {
                            return ele;
                        }
                    })
                )

            }
            else if (tool === "circle") {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                center: Math.sqrt(Math.pow(ele.offsetX - offsetX, 2) + Math.pow(ele.offsetY - offsetY, 2))
                            };
                        } else {
                            return ele;
                        }
                    })
                )

            }
        }

    }


    return (
        <div
            style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className='shadow-lg'>
            <canvas
                className='bg-white'
                ref={canvasRef}></canvas>
        </div>
    )
}

export default Whiteboard 