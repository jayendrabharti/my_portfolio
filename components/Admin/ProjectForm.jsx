"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { projectValidationSchema } from '@/utils/validationSchema';
import FormField from './FormField';
import TagInput from './TagInput';
import uploadImage from '@/utils/uploadImage';
import { useState } from 'react';
import Image from 'next/image';

import { 
    Github, 
    Globe, 
    Image as ImageIcon, 
    Star, 
    Tag as TagIcon, 
    Send,
    Trash2,
    LoaderCircle,
    UploadIcon,
    XIcon
} from 'lucide-react';

const defaultInitialValues = {
    title: '',
    description: '',
    tags: [],
    image: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    slug: '',
};

export default function ProjectForm({ onSubmit, initialValues = defaultInitialValues }){

    const [projectImageURL,setProjectImageURL] = useState(initialValues.image);
    const [gettingURL,setGettingURL] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
        try {
            setGettingURL(true);
            const data = await uploadImage(file);
            console.log(data);
            setProjectImageURL(data.url);
            setGettingURL(false);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
        }
    }



    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-lg p-6 md:p-8 transition-all duration-300">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">Submit Project</h2>
            
            <Formik
                initialValues={{ ...defaultInitialValues, ...initialValues }}
                validationSchema={projectValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if(!projectImageURL){
                        alert("Image is Required");
                        return;
                    }
                    values.image = projectImageURL;
                    onSubmit(values);
                }}
            >
                {({ values, errors, touched, isSubmitting, setFieldValue, resetForm }) => (
                    <Form className="space-y-6">

{/* ################################################################################# */}


            {projectImageURL 
            ? 
            <div className='relative'>
                <Image
                    src={projectImageURL}
                    alt='paymentss'
                    width={300}
                    height={300}
                    className='mx-auto w-full'
                />
                <XIcon
                    onClick={()=>setProjectImageURL(null)} 
                    className='bg-black text-white rounded-full size-10 p-1 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'
                /> 
            </div>
            :
            <div className="relative">
                <div className='relative max-w-md h-48 mx-auto'>
                    <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-zinc-200 dark:bg-zinc-900 rounded-2xl outline-4 outline-dashed outline-zinc-500 text-zinc-500'>
                        {gettingURL?
                            <>
                                <LoaderCircle className='size-24 animate-spin'/>
                                <span className='font-bold text-xl'>Uploading Image...</span>
                            </>
                            :
                            <>
                                <UploadIcon className='size-24'/>
                                <span className='font-bold text-xl'>Upload Cover Image</span>
                            </>    
                        }

                    </div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="block w-full h-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 opacity-0"
                    />
                </div>
            </div>
            }

{/* ################################################################################# */}




                        <FormField
                            name="title"
                            label="Project Title"
                            placeholder="My Awesome Project"
                            onBlur={(e) => {
                                if (!values.slug) {
                                    // Create slug from title
                                    const slug = e.target.value
                                        .toLowerCase()
                                        .replace(/[^\w\s]/gi, '')
                                        .replace(/\s+/g, '-');
                                    setFieldValue('slug', slug);
                                }
                            }}
                        />

                        <FormField
                            name="description"
                            label="Description"
                            as="textarea"
                            rows={4}
                            placeholder="Describe your project in detail..."
                        />

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                <div className="flex items-center gap-2">
                                    <TagIcon size={16} className="text-indigo-500" />
                                    Tags
                                </div>
                            </label>
                            <TagInput
                                values={values.tags}
                                onChange={(tags) => setFieldValue('tags', tags)}
                            />
                            {errors.tags && touched.tags ? (
                                <div className="text-red-500 text-xs mt-1">{errors.tags}</div>
                            ) : null}
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="githubUrl"
                                label="GitHub URL"
                                placeholder="https://github.com/username/repo"
                                icon={<Github size={16} className="text-indigo-500" />}
                            />
                            
                            <FormField
                                name="liveUrl"
                                label="Live Demo URL"
                                placeholder="https://myproject.example.com"
                                icon={<Globe size={16} className="text-indigo-500" />}
                            />
                        </div>

                        <FormField
                            name="slug"
                            label="URL Slug"
                            placeholder="my-awesome-project"
                            helpText="This will be used in the URL of your project page"
                        />

                        <div className="flex items-center space-x-2">
                            <Field
                                type="checkbox"
                                id="featured"
                                name="featured"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 dark:border-zinc-600 rounded transition-all duration-200 cursor-pointer"
                            />
                            <label htmlFor="featured" className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
                                <Star size={16} className="text-amber-500" />
                                Featured Project
                            </label>
                        </div>

                        {isSubmitting ? (
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : (
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => resetForm()}
                                    className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Clear Form
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center gap-2"
                                >
                                    <Send size={16} />
                                    {isSubmitting?"Submitting...":"Submit Project"}
                                </button>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};
