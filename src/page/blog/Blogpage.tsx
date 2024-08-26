import React, { useState } from 'react';
import img from "../../assets/blog.jpg"
import user from "../../assets/user.jpg"
interface Blog {
    id: number;
    title: string;
    content: string;
    fullContent: string;
    author: string;
    authorImage: string;
    publishedDate: string;
    thumbnail: string;
}
const Blogpage: React.FC = () => {
    const [selectedBlog, setSelectedBlog] = useState<null | typeof blogs[0]>(null);

    const blogs = [
        {
            id: 1,
            title: "Understanding React Hooks",
            content: "React Hooks are functions that let you use state and other React features without writing a class...",
            fullContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam nisi reprehenderit iste obcaecati! Fugiat animi fuga rerum nulla ducimus quidem commodi soluta officia quasi vel eos, quae similique illum optio.",
            author: "John Doe",
            authorImage: user, // Replace with actual author image URL
            publishedDate: "2024-08-01",
            thumbnail: img, // Replace with actual thumbnail image URL
        },
        {
            id: 2,
            title: "Getting Started with TypeScript",
            content: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript...",
            fullContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam nisi reprehenderit iste obcaecati! Fugiat animi fuga rerum nulla ducimus quidem commodi soluta officia quasi vel eos, quae similique illum optio.",
            author: "Jane Smith",
            authorImage: user,
            publishedDate: "2024-07-25",
            thumbnail: img,
        },
        {
            id: 3,
            title: "The Importance of Responsive Design",
            content: "Responsive design ensures that your web applications work well on all screen sizes...",
            fullContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam nisi reprehenderit iste obcaecati! Fugiat animi fuga rerum nulla ducimus quidem commodi soluta officia quasi vel eos, quae similique illum optio.",
            author: "Alice Johnson",
            authorImage: user,
            publishedDate: "2024-07-20",
            thumbnail: img,
        },
        {
            id: 4,
            title: "Introduction to Node.js",
            content: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine...",
            fullContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam nisi reprehenderit iste obcaecati! Fugiat animi fuga rerum nulla ducimus quidem commodi soluta officia quasi vel eos, quae similique illum optio.",
            author: "Bob Brown",
            authorImage: user,
            publishedDate: "2024-07-15",
            thumbnail: img,
        },
        {
            id: 5,
            title: "CSS Grid vs. Flexbox",
            content: "CSS Grid and Flexbox are two powerful layout systems in CSS...",
            fullContent: "Full content of CSS Grid vs. Flexbox goes here...",
            author: "Carol White",
            authorImage: user,
            publishedDate: "2024-07-10",
            thumbnail: img,
        },
        {
            id: 6,
            title: "A Guide to Modern JavaScript",
            content: "Modern JavaScript introduces new features like arrow functions, classes, and template literals...",
            fullContent: "Full content of Modern JavaScript goes here...",
            author: "Dave Green",
            authorImage: user,
            publishedDate: "2024-07-05",
            thumbnail: img,
        }
    ];

    return (
        <div className="container mx-auto p-6 mt-20 text-white  max-w-screen-xl">
            <h1 className="text-5xl font-bold text-center ">Blog Posts</h1>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mt-20">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        onClick={() => setSelectedBlog(blog)}
                    />
                ))}
            </div>

            {selectedBlog && (
                <BlogModal
                    blog={selectedBlog}
                    onClose={() => setSelectedBlog(null)}
                />
            )}
            <div className='flex justify-center items-center mt-16'>
                <button className='btn rounded-lg py-2 px-4'>More Blog</button>
            </div>
        </div>
    );
};

const BlogCard: React.FC<{ blog: Blog; onClick: () => void }> = ({ blog, onClick }) => (
    <div key={blog.id} className="relative flex bg-clip-border rounded-xl bg-[#211F37] text-white shadow-md w-full max-w-[48rem] flex-row">
        <div className="relative w-2/5 m-0 overflow-hidden bg-[#a6a8a8] rounded-r-none bg-clip-border rounded-xl shrink-0">
            <img src={blog.thumbnail} alt={blog.title} className="object-cover w-full h-full" />
        </div>
        <div className="p-6 flex flex-col justify-between">
            <div>
                <div className='flex gap-2 mb-1 items-center'>
                    <img className='w-10 h-10 rounded-full' src={blog.authorImage} alt="" />
                    <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal uppercase">
                        {blog.author}
                    </h6>
                </div>
                <h4 className="block mb-4 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {blog.title}
                </h4>
                <p className="block mb-4 font-sans text-base antialiased font-normal leading-relaxed ">
                    {blog.content}
                </p>
            </div>
            <button
                onClick={onClick}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg bg-white hover:bg-gray-900 hover:text-white w-[150px] active:bg-gray-900/20"
                aria-label={`Learn more about ${blog.title}`}
            >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
            </button>
        </div>
    </div>
);

const BlogModal: React.FC<{ blog: Blog; onClose: () => void }> = ({ blog, onClose }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity">
        <div className="bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full p-6 transform transition-transform">
            <h2 className="text-3xl font-semibold mb-4">{blog.title}</h2>
            <p className="text-gray-400 mb-4">By {blog.author} on {new Date(blog.publishedDate).toLocaleDateString()}</p>
            <p className="text-gray-300 mb-6">{blog.fullContent}</p>
            <div className="text-right">
                <button
                    className="btn btn-primary px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);

export default Blogpage;
