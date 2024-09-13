export const setImages = (images) => ({
  type: 'SET_IMAGES',
  payload: images,
});

export const fetchImages = () => {
  return (dispatch) => {
    fetch('http://localhost:5000/images') // API to fetch images
      .then((response) => response.json())
      .then((images) => {
        dispatch(setImages(images)); // Dispatch the action to store images in Redux
      })
      .catch((error) => console.error('Error fetching images:', error));
  };
};

  