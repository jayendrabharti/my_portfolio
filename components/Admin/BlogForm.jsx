"use client";
import React from 'react';
import { Formik, Form } from 'formik';
import { blogValidationSchema } from '@/utils/validationSchema';
import FormField from './FormField';
import TagInput from './TagInput';
import uploadImage from '@/utils/uploadImage';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { 
    Calendar,
    Image as ImageIcon,
    Tag as TagIcon,
    Send,
    Trash2,
    Eye,
    MessageSquare,
    UploadIcon,
    LoaderCircle
} from 'lucide-react';
import dynamic from 'next/dynamic';
const BlogEditor = dynamic(() => import('@/components/Blogs/BlogEditor'), { ssr: false });

const defaultInitialValues = {
    title: '',
    slug: '',
    content: null,
    coverImage: '',
    tags: [],
    datetime: new Date().toISOString().split('T')[0],
    views: 0
};

export default function BlogForm({ onSubmit, initialValues = defaultInitialValues }) {

    const [blogImageURL,setBlogImageURL] = useState(initialValues.coverImage);
    const [gettingURL,setGettingURL] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
        try {
            setGettingURL(true);
            const data = await uploadImage(file);
            console.log(data);
            setBlogImageURL(data.url);
            setGettingURL(false);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
        }
    }


    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-lg p-6 md:p-8 transition-all duration-300">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">Create Blog Post</h2>
            
            <Formik
                initialValues={{ ...defaultInitialValues, ...initialValues }}
                validationSchema={blogValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if(!blogImageURL){
                        alert("Image is Required");
                        return;
                    }
                    values.coverImage = blogImageURL;
                    onSubmit(values);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ values, isSubmitting, setFieldValue }) => (
                    <Form className="space-y-6">


                        {/* ################################################################################# */}


            {blogImageURL 
            ? 
                <Image
                    src={blogImageURL}
                    alt='paymentss'
                    width={300}
                    height={300}
                    className='mx-auto w-full'
                />
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
                            label="Blog Title"
                            placeholder="Enter your blog title"
                            onBlur={(e) => {
                                if (!values.slug) {
                                    const slug = e.target.value
                                        .toLowerCase()
                                        .replace(/[^\w\s]/gi, '')
                                        .replace(/\s+/g, '-');
                                    setFieldValue('slug', slug);
                                }
                            }}
                        />

                        <FormField
                            name="slug"
                            label="URL Slug"
                            placeholder="your-blog-title"
                            helpText="This will be used in the URL of your blog post"
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="datetime"
                                label="Publication Date"
                                type="date"
                                icon={<Calendar size={16} className="text-indigo-500" />}
                            />

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Eye size={16} className="text-zinc-500 dark:text-zinc-400" />
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">{values.views} views</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MessageSquare size={16} className="text-zinc-500 dark:text-zinc-400" />
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">0 comments</span>
                                </div>
                            </div>
                        </div>

                        <BlogEditor 
                            content={values.content} 
                            setContent={(c)=>setFieldValue("content",c)}
                        />

                        {isSubmitting ? (
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : (
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => resetForm()}
                                    className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center gap-2"
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
                                    Publish Post
                                </button>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};
