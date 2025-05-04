"use client";
import Quill from 'quill';
import "quill/dist/quill.snow.css";

import { useRef, useState, useEffect, useCallback } from 'react';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function BlogEditor({content,setContent}){
  const [quill, setQuill] = useState();
  
  
  useEffect(() => {
    if (!quill) return;

    const handleTextChange = () => {
      const delta = quill.getContents();
      setContent(delta.ops);
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
      modules: { toolbar: TOOLBAR_OPTIONS },
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
          className='light'
          ref={containerRef}
        ></div>
      )

}