import {
  observable,
  action,
  computed,
  makeObservable,
  runInAction
} from 'mobx';

// API
import api from 'api';

// Types
import { Post } from 'types/post';

class PostsStore {
  @observable
  posts: Post[] = [];

  @observable
  loading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  getPostsList = async (): Promise<void> => {
    try {
      this.loading = true;

      const posts = await api.posts.getPostsList();

      runInAction(() => {
        this.posts = posts;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

const postsStore = new PostsStore();

export default postsStore;
