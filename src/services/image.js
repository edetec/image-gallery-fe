import client from './http'; 

export const getAllImages = () => {
  return client.get('/v1/image');
};