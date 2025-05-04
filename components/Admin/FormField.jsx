"use client";

import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Info } from 'lucide-react';

const FormField = ({ 
    name, 
    label, 
    placeholder, 
    as = 'input', 
    rows = 3,
    type = 'text',
    helpText,
    icon,
    onBlur
}) => {
    return (
        <div className="space-y-1">
            <label htmlFor={name} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                    {icon}
                    {label}
                </div>
            </label>
            
            <Field
                id={name}
                name={name}
                as={as}
                type={type}
                rows={rows}
                placeholder={placeholder}
                onBlur={onBlur}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 rounded-md px-3 py-2 border transition-all duration-200"
            />
            
            {helpText && (
                <div className="flex items-start mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <Info size={12} className="mr-1 mt-0.5 flex-shrink-0" />
                    <span>{helpText}</span>
                </div>
            )}
            
            <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
        </div>
    );
};

export default FormField;
