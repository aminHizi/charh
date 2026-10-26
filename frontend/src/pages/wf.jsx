import "./wf.css"
import { useState,useEffect } from "react";
import FileCont from "../components/fileCont.jsx";
import AddButton from "../components/addButton.jsx";
import Chat from "../components/chat.jsx";
import Tools from "../components/tools.jsx";
export default function Wf() {
    const [files,setFiles] = useState([]);
    const addFile = () => {
        const newFile = {
            name: `file${files.length + 1}`,
            description: `This is the content of file${files.length + 1}`
        };
        setFiles([...files, newFile]);
    }; 
    return(

    <>
        <div className="workflow">
            <div className="filesBar ">
                {files.map((file,index)=>(
                    <FileCont key={index} name={file.name} description={file.description} />
                ))}

            </div>
            <div className="content">
                <Chat />
                <AddButton onClick={()=>addFile()} />
                <Tools />
            </div>
        </div>
    </>
    )
}