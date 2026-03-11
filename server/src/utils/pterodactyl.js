const axios = require('axios');

const pteroAppClient = axios.create({
  baseURL: `${process.env.PTERO_PANEL_URL}/api/application`,
  headers: {
    Authorization: `Bearer ${process.env.PTERO_APP_API_KEY}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const pteroClientClient = axios.create({
  baseURL: `${process.env.PTERO_PANEL_URL}/api/client`,
  headers: {
    Authorization: `Bearer ${process.env.PTERO_CLIENT_API_KEY}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const createPteroUser = async (email, username, password) => {
  try {
    const response = await pteroAppClient.post('/users', {
      email,
      username,
      first_name: username,
      last_name: 'User',
      password,
    });
    return response.data.attributes;
  } catch (error) {
    console.error('Error creating Pterodactyl user:', error.response?.data || error.message);
    throw new Error(error.response?.data?.errors?.[0]?.detail || 'Failed to create user in panel');
  }
};

module.exports = {
  pteroAppClient,
  pteroClientClient,
  createPteroUser,
};
