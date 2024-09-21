export const setImages = (images) => ({
  type: 'SET_IMAGES',
  payload: images,
});

export const fetchImages = () => {
  return (dispatch) => {
    fetch('http://localhost:5000/images') 
      .then((response) => response.json())
      .then((images) => {
        dispatch(setImages(images)); 
      })
      .catch((error) => console.error('Error fetching images:', error));
  };
};

  