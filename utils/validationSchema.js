import * as Yup from 'yup';

// URL validation regex pattern
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const projectValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Project title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  
  description: Yup.string()
    .required('Project description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  
  tags: Yup.array()
    .of(Yup.string())
    .min(1, 'Add at least one tag')
    .max(10, 'Maximum 10 tags allowed'),
  
  image: Yup.string()
    .url('Must be a valid URL')
    .matches(urlRegex, 'Enter a valid URL')
    .nullable(),
  
  githubUrl: Yup.string()
    .url('Must be a valid URL')
    .matches(
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-_]+\/?$/,
      'Enter a valid GitHub repository URL'
    )
    .nullable(),
  
  liveUrl: Yup.string()
    .url('Must be a valid URL')
    .matches(urlRegex, 'Enter a valid URL')
    .nullable(),
  
  featured: Yup.boolean()
    .default(false),
  
  slug: Yup.string()
    .required('Project slug is required')
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must be less than 100 characters')
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    )
});


export const blogValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Blog title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  
  slug: Yup.string()
    .required('Blog slug is required')
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must be less than 100 characters')
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    ),
  
  content: Yup.array(),
  
  coverImage: Yup.string()
    .url('Must be a valid URL')
    .nullable(),
  
  tags: Yup.array()
    .of(Yup.string())
    .min(1, 'Add at least one tag')
    .max(10, 'Maximum 10 tags allowed'),
  
  datetime: Yup.date()
    .required('Publication date is required'),
  
  views: Yup.number()
    .min(0, 'Views cannot be negative')
    .default(0)
});