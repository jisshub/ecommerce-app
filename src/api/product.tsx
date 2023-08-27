// API endpoint: https://fakestoreapi.com/products

import { Product } from '../productTypes';

import axios, { AxiosResponse } from 'axios';

const API_ENDPOINT = 'https://fakestoreapi.com/products';

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse<Product[]> = await axios.get(API_ENDPOINT);
        
        if (response.status !== 200) {
            throw new Error(`Failed to fetch products. HTTP Status: ${response.status}`);
        }

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data || 'Failed to fetch products.');
        } else if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred.');
    }
}


export const getProduct = async (id: number): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await axios.get(`${API_ENDPOINT}/${id}`);
        
        if (response.status !== 200) {
            throw new Error(`Failed to fetch product with ID ${id}. HTTP Status: ${response.status}`);
        }

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data || `Failed to fetch product with ID ${id}.`);
        } else if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred.');
    }
}






    
