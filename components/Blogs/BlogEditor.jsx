"use client";

import hljs from "highlight.js";
import Quill from 'quill';
import "highlight.js/styles/atom-one-dark.css";
import "quill/dist/quill.snow.css";
import { Merriweather } from 'next/font/google';
import { useState, useEffect, useCallback } from 'react';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
});

const TOOLBAR_OPTIONS = [
  [{ 'font': [] }],
  
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  
  ['blockquote', 'code-block'],
  
  
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  
  [{ 'direction': 'rtl' }],                         // text direction
  
  // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  
  [{ 'align': [] }],
  
  ['link', 'image', 'video', 'formula'],
  
  ['clean'],                                     // remove formatting button
];

const options = {
  theme: "snow",
  placeholder: 'Write your blog...',
  readOnly: true,
  modules: { 
    syntax: { hljs },
    toolbar: TOOLBAR_OPTIONS 
  },
}

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
    return () => quill.off('text-change', handleTextChange);
  }, [quill]);

  const containerRef = useCallback((container)=>{
    if(!container)return;
    container.innerHTML = "";
    const editor = document.createElement('div');
    container.append(editor);
    const q = new Quill(editor, options);
    q.disable();
    q.setText("Loading...");
    setQuill(q)
    q.setContents(content);
    q.enable();
    
  },[]);


  return(
    <div 
      id='container'
      className={`container ${merriweather.className}`}
      ref={containerRef}
    >
    </div>
  )

}