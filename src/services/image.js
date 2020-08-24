import client, { BACKEND } from './http';

export const saveImage = (file, description, id) => {
  const options = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
  };
  const formData = new FormData();
  formData.append('file', file);
  if (description) {
    formData.append('description', description);
  }

  if (id) {
    return client.put(`/v1/image/${id}`, formData, options)
  }
  return client.post('/v1/image/', formData, options);
};

export const getAllImages = (filters) => {
  return client.get('/v1/image/', {
    params: filters
  });
};

export const getAllImageDimensions = (filters) => {
  return client.get('/v1/image/dimensions/', {
    params: filters
  });
};

export const getImageUrl = (imagePath) => `${BACKEND}/${imagePath}`;