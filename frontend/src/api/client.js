import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const fetchWalletOverview = async (address) => {
  try {
    const res = await api.get(`/wallet/${address}/overview`);
    return res.data;
  } catch (error) {
    console.error('[API] Error fetching wallet overview', error);
    return {
      success: false,
      error: {
        message: error?.response?.data?.error?.message || 'Unable to fetch wallet data',
        code: error?.response?.data?.error?.code || 'NETWORK_ERROR'
      }
    };
  }
};

export default api;
