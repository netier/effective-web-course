import { useEffect, FC } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import postsStore from 'stores/PostsStore';

const Posts: FC = () => {
  const { posts, loading } = postsStore;

  useEffect(() => {
    postsStore.getPostsList();
  }, []);

  return (
    <div>
      {loading ? 'Loading...' : null}
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default observer(Posts);
