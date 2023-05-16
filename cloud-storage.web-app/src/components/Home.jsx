import React, { useContext, useEffect, useState } from 'react';
import { getImagesFromDB, uploadImageToDB } from '../services/userService';
import Image from './Image';
import Spinner from './Spinner';
import { ImagesContext } from '../contexts/imagesContext';
import { LoginContext } from '../contexts/loginContext';

const Home = () => {
  const { dispatchImagesData } = useContext(ImagesContext);
  const { userData } = useContext(LoginContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let isComponentExist = true;
    setShowSpinner(true);
    if (isComponentExist) {
      getImagesFromDB(userData.token).then((res) => {
        console.log('1', res);
        setImages(res);
        setShowSpinner(false);
        isComponentExist = false;
      });
    }
  }, [dispatchImagesData, userData.token]);

  const uploadImagesFunc = (event) => {
    event.preventDefault();
    const image = event.target.children[0].files[0];
    const formData = new FormData();
    formData.append('image', image);

    uploadImageToDB(formData, userData.token)
      .then((res) => {
        console.log(res);
        return getImagesFromDB(userData.token);
      })
      .then((newImages) => {
        setImages(newImages);
      });
  };

  return (
    <div className='home'>
      {showSpinner && <Spinner />}
      <h1>Image App</h1>
      <form onSubmit={uploadImagesFunc}>
        <input type='file' name='image' />
        <button type='submit'>Submit</button>
      </form>
      {images.map((image) => (
        <Image image={image} setImages={setImages} key={image._id} />
      ))}
    </div>
  );
};

export default Home;
