"use client";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";


import { useRef, useState, useEffect, useCallback } from 'react';

const TOOLBAR_OPTIONS = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike", "code"],
  [{ script: "sub" }, { script: "super" }],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ align: [] }],
  ["link", "image","video" ,"blockquote", "code-block"],
  ["clean"],
];

export default function BlogEditor({content,setContent,setDisplayContent}){
  const [quill, setQuill] = useState();
  
  useEffect(() => {
    if (!quill) return;

    const handleTextChange = () => {
      const delta = quill.getContents();
      const displayContent = document.getElementsByClassName('ql-editor')[0].innerHTML;
      setContent(delta.ops);
      setDisplayContent(displayContent);
    };

    quill.on('text-change', handleTextChange);
    return () => {
      quill.off('text-change', handleTextChange);
    };
  }, [quill]);

  const containerRef = useCallback((container)=>{
    if(!container)return;
  
    container.innerHTML = "";
    const editor = document.createElement('div');
    container.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { 
        syntax: { hljs },
        toolbar: TOOLBAR_OPTIONS 
      },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q)
    q.setContents(content);
    q.enable();
  },[]);


  return(
    <div 
      id='container'
      className='container'
      ref={containerRef}
    ></div>
  )

}