import axios from 'axios';

// Config
import envs from 'config/environments';

const instance = axios.create({
  baseURL: envs.baseApiUrl
});

export default instance;
