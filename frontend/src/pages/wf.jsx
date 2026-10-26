import "./wf.css"
import { useState,useEffect,useRef } from "react";
import FileCont from "../components/fileCont.jsx";
import AddButton from "../components/addButton.jsx";
import Chat from "../components/chat.jsx";
import Tools from "../components/tools.jsx";
export default function Wf() {
    
    const fileInputRef = useRef(null);
    const [files,setFiles] = useState([]);
    const handleFiles = (e) => {
            const chosen = Array.from(e.target.files);   // FileList -> normal array
            for (let i = 0; i < chosen.length; i++) {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                console.log("FormData:", formData);
                formData.append("file", chosen[i]);
                console.log("formData after append", formData);
                xhr.upload.onprogress = (e)=>{
                    console.log(e.loaded/e.total*100 + "%");
                }
                xhr.open("POST", "http://localhost:3000/api/sources");
                console.log(chosen[i]);
                xhr.send(formData);
            }
            setFiles((prev) => [...prev, ...chosen]);
            e.target.value = "";                         // lets you pick the same file again
        };
    

    return(

    <>
        <div className="workflow">
            <div className="filesBar ">
                {files.map((file, i) => (
                    <FileCont
                    key={i}
                    name={file.name}
                    description={`${(file.size / 1024).toFixed(1)} KB`}
                    />
                ))}

            </div>
            <div className="content">
                <Chat />
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFiles}
                        style={{ display: "none" }}
                    />
                <AddButton onClick={()=>fileInputRef.current.click()} />
                <Tools />
            </div>
        </div>
    </>
    )
}