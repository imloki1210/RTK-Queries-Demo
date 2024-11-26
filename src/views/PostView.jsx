import React, { useState } from 'react';
import './PostView.css';

const PostView = ({
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  isLoading,
  isError,
}) => {
  const [formState, setFormState] = useState({ title: '', content: '', id: null });
  const [isFormVisible, setIsFormVisible] = useState(false);

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="spinner"></div> 
      </div>
    );

  if (isError)
    return (
      <div className="error-container">
        <p className="error">Something went wrong while fetching posts!</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );

  const posts = fetchPosts();

  const handleFormSubmit = () => {
    if (formState.id) {
      updatePost(formState.id, { title: formState.title, content: formState.content });
    } else {
      createPost({ title: formState.title, content: formState.content });
    }
    resetForm();
  };

  const handleEdit = (post) => {
    setFormState(post);
    setIsFormVisible(true);
  };

  const resetForm = () => {
    setFormState({ title: '', content: '', id: null });
    setIsFormVisible(false);
  };

  return (
    <div className="post-view">
      <h1>Posts</h1>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <div className="post-details">
              <div>
                <strong>{post.title}</strong>
                <p>{post.content}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={() => setIsFormVisible(true)} className="create-post-btn">
        Create New Post
      </button>

      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>{formState.id ? 'Edit Post' : 'Create New Post'}</h2>
            <input
              type="text"
              placeholder="Title"
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
            />
            <textarea
              placeholder="Content"
              value={formState.content}
              onChange={(e) => setFormState({ ...formState, content: e.target.value })}
            />
            <div className="form-actions">
              <button onClick={handleFormSubmit}>{formState.id ? 'Update' : 'Create'}</button>
              <button onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostView;
