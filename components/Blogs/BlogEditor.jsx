"use client";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
 

import { useRef, useState, useEffect, useCallback } from 'react';

const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
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
      placeholder: 'Write your blog...',
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