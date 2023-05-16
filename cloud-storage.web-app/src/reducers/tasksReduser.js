export const imagesInitialState = [];

const imageReducer = (imagesData, action) => {
  switch (action.type) {
    case 'UPLOAD_IMAGE':
      return [...imagesData, action.task];
    case 'DELETE_IMAGE':
      const newImages = imagesData.filter((image) => image._id !== action.id);
      return [...newImages];
    case 'GET_IMAGES':
      return [...action.images];
    default:
      return [...imagesData];
  }
};

export default imageReducer;
