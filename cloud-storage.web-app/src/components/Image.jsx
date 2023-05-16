import React, { useContext } from 'react';
// import { setImagesAction } from '../actions/imagesActions';
// import { ImagesContext } from '../contexts/imagesContext';
import { LoginContext } from '../contexts/loginContext';
import { deleteImageFromDB, getImagesFromDB } from '../services/userService';

const Image = ({ image, setImages }) => {
  const { userData } = useContext(LoginContext);
  console.log(image);

  const url = `${process.env.REACT_APP_API_URL}users/get-image`;

  const deleteImageFunc = (id, key) => {
    deleteImageFromDB(id, key, userData.token)
      .then(() => {
        alert('Image deleted');
        return getImagesFromDB(userData.token);
      })
      .then((newImages) => {
        setImages(newImages);
      });
  };

  return (
    <>
      {image.image != null && (
        <div key={image.image._id}>
          <h3>{image.image.originalName}</h3>
          <img
            src={
              url + `?key=${image.image.key}&name=${image.image.originalName}`
            }
            alt={image.image.originalName}
          />
          <button
            onClick={() => deleteImageFunc(image.image._id, image.image.key)}>
            Delete {image.image.originalName}
          </button>
          <hr />
        </div>
      )}
    </>
  );
};

export default Image;
