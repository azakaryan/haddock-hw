import axios from 'axios';

function createApiClient() {
  const apiClient = axios.create();;

  apiClient.interceptors.response.use(response => response,
    async () => {
      // TODO handle general errors here.
    });

  return apiClient;
}

export default createApiClient();

