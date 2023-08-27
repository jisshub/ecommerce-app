import React from 'react';
import { Product } from '../productTypes';

type CartContextType = {
    carts: Product[];
    setCarts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const CartContext = React.createContext<CartContextType | undefined>(undefined);
