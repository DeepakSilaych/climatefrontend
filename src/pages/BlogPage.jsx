import React, { useState } from 'react';
import './BlogPage.css'; // Add any custom styling here

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      content,
      date: new Date(),
      author: {
        name: 'Name',
        image: 'https://via.placeholder.com/50', // Replace with actual image URL
        details: 'Weather expert and blogger from Mumbai',
      },
    };
    setBlogs([newBlog, ...blogs]);
    setTitle('');
    setContent('');
  };

  const handleAuthorClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="blog-page">
      <h1 className="page-title">Mumbai Weather Blog</h1>
      <form className="blog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Content"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="blogs">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-post">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <div className="blog-footer">
              <span className="blog-date">{blog.date.toLocaleString()}</span>
              <div className="blog-author" onClick={handleAuthorClick}>
                <img src={blog.author.image} alt={blog.author.name} className="author-image" />
                <span>{blog.author.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Name</h2>
            <img src=" " alt="Name" className="modal-author-image" />
            <p>Weather expert and blogger from Mumbai</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
