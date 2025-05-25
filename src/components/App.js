import './../styles/App.css';
import React, { useState, useEffect, useMemo } from 'react';

const App = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setPosts(data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Error fetching posts:', error);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // prevents state update on unmounted component
    };
  }, [API_URL]);

  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <div>
      <h2>Posts</h2>
      {loading && <p>Loading...</p>}
      {!loading && memoizedPosts && (
        <ul>
          {memoizedPosts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
