import { useState, useRef, useEffect } from 'react'
import Whiteboard from '../components/Whiteboard'
import './style.css'
import { AiOutlineLine, AiOutlineHome, AiOutlineUndo, AiOutlineRedo, AiOutlineClear } from "react-icons/ai";
import { BiColor, BiPencil, BiRectangle, BiCircle, BiSave, BiText } from "react-icons/bi";
import { BsEgg } from "react-icons/bs";
import { updateDrawing, createDrawing } from '../services/api';
import { useParams } from 'react-router-dom';


const RoomPage = () => {
    const params = useParams();
    const isIdEmpty = (obj) => Object.keys(obj).length === 0;

    const [tool, setTool] = useState("pencil")
    const [color, setColor] = useState("color")
    const [elements, setElements] = useState([])
    const [history, setHistory] = useState([])

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [drawing, setDrawing] = useState(null);

    function handleClear() {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        // context.fillRect("white")

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        setElements([])
    }

    function handleUndo() {
        console.log("undo")
        setHistory(prevHistory => [
            ...prevHistory, elements[elements.length - 1]
        ])
        //important to return the elements
        setElements(prevElements => {
            return prevElements.slice(0, prevElements.length - 1)
        })

        if (elements.length === 1) {
            handleClear()
        }

    }

    function handleRedo() {
        setHistory(prevHistory => {
            return prevHistory.slice(0, prevHistory.length - 1)
        })

        setElements(prevElements => [
            ...prevElements, history[history.length - 1]
        ])

    }
    async function handleSave() {
        const drawing = {
            "boardName": "Sample Board",
            "createdBy": "User2"
        }

        const array = []

        for (let element of elements) {
            const obj = {
                elementType: element.type,
                position: { x: element.width, y: element.height },
                [element.type]: {
                    points: element.type === 'line' ? [{ "x": element.offsetX, "y": element.offsetY }] : element.path,
                    strokeColor: element.color,
                }
            }
            array.push(obj)
        }

        const updatedDrawing = { ...drawing, elements: array };
        console.error("🥳 ~ handleSave ~ updatedDrawing:", updatedDrawing)
        await createDrawing(updatedDrawing);
    }
    async function handleUpdate() {
        const drawing = {
            "boardName": "Sample Board",
            "createdBy": "User2"
        }

        const array = []

        for (let element of elements) {
            const obj = {
                elementType: element.type,
                position: { x: element.width, y: element.height },
                [element.type]: {
                    points: element.type === 'line' ? [{ "x": element.offsetX, "y": element.offsetY }] : element.path,
                    strokeColor: element.color,
                }
            }
            array.push(obj)
        }

        const updatedDrawing = { ...drawing, elements: array };
        console.error("🥳 ~ handleSave ~ updatedDrawing:", updatedDrawing)
        await updateDrawing(params, updatedDrawing);
    }


    return (
        <div>
            {/* <div className='flex p-2'>
                <div className='flex'>
                    <div className='mx-2 text-white'>
                        <input
                            type="radio"
                            id="pencil"
                            name="tool"
                            checked={tool === "pencil"}
                            value="pencil"
                            onChange={(e) => setTool(e.target.value)} />
                        <label htmlFor="pencil">Pencil</label>
                    </div>
                    <div className='mx-2 text-white'>
                        <input
                            type="radio"
                            id="line"
                            name="tool"
                            value="line"
                            checked={tool === "line"}
                            onChange={(e) => setTool(e.target.value)} />
                        <label htmlFor="line">Line</label>
                    </div>
                    <div className='mx-2 text-white'>
                        <input
                            type="radio"
                            id="rectangle"
                            name="tool"
                            checked={tool === "rectangle"}
                            value="rectangle"
                            onChange={(e) => setTool(e.target.value)} />
                        <label htmlFor="rectangle">Rectangle</label>
                    </div>
                    <div className='mx-2 text-white'>
                        <input
                            type="radio"
                            id="ellipse"
                            name="tool"
                            checked={tool === "ellipse"}
                            value="ellipse"
                            onChange={(e) => setTool(e.target.value)} />
                        <label htmlFor="ellipse">Ellipse</label>
                    </div>
                    <div className='mx-2 text-white'>
                        <input
                            type="radio"
                            id="circle"
                            name="tool"
                            checked={tool === "circle"}
                            value="circle"
                            onChange={(e) => setTool(e.target.value)} />
                        <label htmlFor="circle">Circle</label>
                    </div>
                </div>
                <div className='mx-2'>
                    <input
                        type="color"
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)} />
                </div>
                <div>
                    <button className="undo mx-2 bg-white shadow-lg rounded-md px-2 py-1"
                        onClick={handleUndo}
                        disabled={elements.length === 0}>Undo</button>
                    <button className=" mx-2 bg-white shadow-lg rounded-md px-2 py-1 redo"
                        onClick={handleRedo}
                        disabled={history.length === 0}>Redo</button>
                </div>
                <div>
                    <button className="mx-2 bg-red-500 shadow-lg rounded-md px-2 py-1 clear" onClick={handleClear}>Clear Canvas</button>
                </div>
                {isIdEmpty(params) ?
                    <div>
                        <button className="mx-2 bg-red-500 shadow-lg rounded-md px-2 py-1 clear" onClick={handleSave}>Save Changes</button>
                    </div>
                    :
                    <div>
                        <button className="mx-2 bg-red-500 shadow-lg rounded-md px-2 py-1 clear" onClick={handleUpdate}>Update Changes</button>
                    </div>
                }
            </div> */}

            <ul className="horizontal-menu">
                <li className="menu-item">
                    <a href="#" className="menu-link">
                        <BiText className="menu-icon" />
                        <span className="menu-text">Text</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link">
                        <AiOutlineHome className="menu-icon" />
                        <span className="menu-text">Home</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link">
                        <AiOutlineUndo className="menu-icon" />
                        <span className="menu-text">Undo</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link">
                        <AiOutlineRedo className="menu-icon" />
                        <span className="menu-text">Redo</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link">
                        <AiOutlineClear className="menu-icon" />
                        <span className="menu-text">Clear All</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link">
                        <BiSave className="menu-icon" />
                        <span className="menu-text">Save</span>
                    </a>
                </li>
            </ul>
            <ul className='vertical-menu'>
                <li onClick={() => setTool("pencil")}>
                    <a href="#">
                        <input
                            type="radio"
                            id="pencil"
                            name="tool"
                            checked={tool === "pencil"}
                            value="pencil"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => setTool(e.target.value)}
                        />
                        <label htmlFor="pencil">
                            <BiPencil style={{ fontSize: '20px' }} />
                            <span>Pencil</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => setTool("line")}>
                    <a href="#">
                        <input
                            type="radio"
                            id="line"
                            name="tool"
                            checked={tool === "line"}
                            value="line"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => setTool(e.target.value)}
                        />
                        <label htmlFor="line">
                            <AiOutlineLine style={{ fontSize: '20px' }} />
                            <span>Line</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => setTool("ellipse")}>
                    <a href="#">
                        <input
                            type="radio"
                            id="ellipse"
                            name="tool"
                            checked={tool === "ellipse"}
                            value="ellipse"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => setTool(e.target.value)}
                        />
                        <label htmlFor="ellipse">
                            <BsEgg style={{ fontSize: '20px' }} />
                            <span>Ellipse</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => setTool("rectangle")}>
                    <a href="#">
                        <input
                            type="radio"
                            id="rectangle"
                            name="tool"
                            checked={tool === "rectangle"}
                            value="rectangle"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => setTool(e.target.value)}
                        />
                        <label htmlFor="rectangle">
                            <BiRectangle style={{ fontSize: '20px' }} />
                            <span>Rectangle</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => setTool("circle")}>
                    <a href="#">
                        <input
                            type="radio"
                            id="circle"
                            name="tool"
                            checked={tool === "circle"}
                            value="circle"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => setTool(e.target.value)}
                        />
                        <label htmlFor="circle">
                            <BiCircle style={{ fontSize: '20px' }} />
                            <span>Circle</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => setColor("color")}>
                    <a href="#">
                        <input
                            type="color"
                            name="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)} />
                        <label htmlFor="color">
                            {/* <BiColor style={{ fontSize: '20px' }} /> */}
                            <span>Color</span>
                        </label>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BiText />
                        <span>Text</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <AiOutlineHome />
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <AiOutlineUndo />
                        <span>Undo</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <AiOutlineRedo />
                        <span>Redo</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <AiOutlineClear />
                        <span>Clear All</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BiSave />
                        <span>Save</span>
                    </a>
                </li>
            </ul>

            <Whiteboard
                canvasRef={canvasRef}
                ctxRef={ctxRef}
                elements={elements}
                setElements={setElements}
                tool={tool}
                color={color}
                setColor={setColor} />

        </div>
    )
}

export default RoomPage