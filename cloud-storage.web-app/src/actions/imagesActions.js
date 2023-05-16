export const uploadImageAction = (image) => ({
  type: 'UPLOAD_IMAGE',
  image,
});

export const deleteImageAction = (id) => ({
  type: 'DELETE_IMAGE',
  id,
});

export const setImagesAction = (images) => ({
  type: 'SET_IMAGES',
  images,
});
