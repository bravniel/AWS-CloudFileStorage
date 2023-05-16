import React, { createContext, useReducer } from 'react';
import imageReducer, { imagesInitialState } from '../reducers/tasksReduser';

export const ImagesContext = createContext();

const ImagesContextProvider = (props) => {
  const [imagesData, dispatchImagesData] = useReducer(
    imageReducer,
    imagesInitialState
  );

  return (
    <ImagesContext.Provider value={{ imagesData, dispatchImagesData }}>
      {props.children}
    </ImagesContext.Provider>
  );
};

export default ImagesContextProvider;
