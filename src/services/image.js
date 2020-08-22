import client, { BACKEND } from './http'; 

export const getAllImages = () => {
  return client.get('/v1/image');
};

export const getImageUrl = (imagePath) => `${BACKEND}/${imagePath}`;