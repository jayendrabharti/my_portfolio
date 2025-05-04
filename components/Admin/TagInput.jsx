"use client";
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const TagInput = ({ values, onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            addTag();
        }
    };

    const addTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !values.includes(trimmedValue)) {
            onChange([...values, trimmedValue]);
            setInputValue('');
        }
    };

    const removeTag = (index) => {
        onChange(values.filter((_, i) => i !== index));
    };

    return (
        <div className="border border-zinc-300 dark:border-zinc-700 rounded-md focus-within:ring-1 focus-within:ring-zinc-500 focus-within:border-zinc-500 p-2 transition-all duration-200">
            <div className="flex flex-wrap gap-2 mb-2">
                {values.map((tag, index) => (
                    <div 
                        key={index} 
                        className="flex items-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 px-2 py-1 rounded-md text-sm group"
                    >
                        <span>{tag}</span>
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 focus:outline-none transition-all duration-200"
                        >
                            <X size={14} className="group-hover:scale-110 transition-transform duration-200" />
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="flex items-center">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag and press Enter"
                    className="flex-1 bg-transparent text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 border-none p-1 focus:outline-none text-sm"
                />
                <button 
                    type="button" 
                    onClick={addTag}
                    disabled={!inputValue.trim()}
                    className="p-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 disabled:text-zinc-400 dark:disabled:text-zinc-600 transition-colors duration-200"
                >
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );
};

export default TagInput;
