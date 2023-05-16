import Axios from 'axios';

  const apiUrl = process.env.REACT_APP_API_URL;

export const uploadImageToDB = async (image, token) => {
  try {
    const res = await Axios.post(apiUrl + 'users/upload-image', image, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteImageFromDB = async (id, key, token) => {
  try {
    const res = await Axios.delete(apiUrl + 'users/delete-image', {
      data: { id, key },
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    // return err.response.data.message;
  }
};
export const getImagesFromDB = async (token) => {
  console.log(token);
  try {
    const res = await Axios.get(apiUrl + 'users/get-images', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    // return err.response.data.message;
  }
};
export const loginToDB = async ({ email, password }) => {
  try {
    const res = await Axios.post(apiUrl + 'users/login', {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    // return err.response.data.message;
  }
};
export const logoutFromDB = async (token) => {
  try {
    const res = await Axios.post(
      apiUrl + 'users/logout',
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    // return err.response.data.message;
  }
};
