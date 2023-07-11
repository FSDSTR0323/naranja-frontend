import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const avatarGetter = async () => {
    const userId = window.localStorage.getItem('userId');
    try {
      const { data } = await axios.get(`${backendUrl}/user/${userId}`);
      return data;
    } catch (error) {
      console.log('Error get Income', error);
      throw error; 
    }
  };

  export default avatarGetter;