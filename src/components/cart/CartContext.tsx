import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
    id: number;
    name: string;
    desc: string;
    price: string;
    imageURL: string;
    quantity: number;
    category: string;
}

interface CartContextType {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartProducts, setCartProducts] = useState<Product[]>([
        {
            id: 1,
            name: 'This is Product 1',
            desc: 'This is the description of product number 1.',
            price: '$350',
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkf_18R6jdRg9UQ3HQiZ1MTa7Xq_9n4uIlXhVNvfYfMK4vdfwDns2074Rp8hNCfApf3_A&usqp=CAU',
            quantity: 4,
            category: 'Sony'
        },
        {
            id: 2,
            name: 'This is Product 2',
            desc: 'This is the description of product number 2.',
            price: '$1350',
            imageURL: 'https://dxtvlpbretzvp.cloudfront.net/media/brandhouse/H630BT-BGE/H630BT-BGE-2.webp',
            quantity: 22,
            category: 'Sony'
        },
        {
            id: 3,
            name: 'This is Product 3',
            desc: 'This is the description of product number 3.',
            price: '$1250',
            imageURL: 'https://skywave.co.ke/wp-content/uploads/2024/03/HAVIT-Pro-Bluetooth-Headphone-with-ANC-H630BT.webp',
            quantity: 15,
            category: 'Beats'
        },
        {
            id: 4,
            name: 'This is Product 4',
            desc: 'This is the description of product number 4.',
            price: '$50',
            imageURL: 'https://cdn.salla.sa/ZGnx/0ew7kpphk347MecI0O5zpPAQhVSkeAC0ObwdJy7y.png',
            quantity: 10,
            category:
                'Apple'
        }
    ]);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
            {children}
        </CartContext.Provider>
    );
};
