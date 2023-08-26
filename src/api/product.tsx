// API endpoint: https://fakestoreapi.com/products

import axios from 'axios';
import { Product } from '../productTypes';

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred.');
    }
}

// ger single product
export const getProduct = async (id: number): Promise<Product> => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred.');
    }
}

    
