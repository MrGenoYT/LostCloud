import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/forum/posts`);
        setPosts(res.data.posts);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleChange = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    setError(null);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/forum/post`, newPost, { withCredentials: true });
      setPosts([res.data.post, ...posts]);
      setNewPost({ title: '', content: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data.error || 'Post creation failed');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>LostCloud Forum</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={newPost.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Your post..."
          value={newPost.content}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="btn signup" disabled={posting}>
          {posting ? 'Posting...' : 'Create Post'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post._id} className="forum-post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>
                By {post.user.username || 'Anonymous'} on {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forum;
