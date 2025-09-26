import axios from 'axios';

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/"
});

export const getPokemon = async (nameOrId) => {
    try {
        const response = await api.get(`pokemon/${nameOrId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;