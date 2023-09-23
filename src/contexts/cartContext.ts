import React from 'react';
import { Product } from '../productTypes';

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartContextType = {
    carts: CartItem[];
    setCarts: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const CartContext = React.createContext<CartContextType | undefined>(undefined);
