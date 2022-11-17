import axios from 'api/helpers/axios';

// Types
import { Post } from 'types/post';

export default {
  async getPostsList(): Promise<Post[]> {
    const response = await axios.get(`/posts`);

    return response.data;
  },

  async getPost(postId: number): Promise<Post> {
    const response = await axios.post(`/posts/${postId}`);

    return response.data;
  }
};
