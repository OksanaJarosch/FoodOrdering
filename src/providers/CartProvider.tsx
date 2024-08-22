import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";


type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
}

//context
const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
});

//provider
const CartProvider = ({children}: PropsWithChildren ) => {
    const [items, setItems] = useState<CartItem[]>([]);

    //fn for adding to cart
    const addItem = (product: Product, size: CartItem['size']) => {
        const existingItem = items.find(item => item.product === product && item.size === size);

        if(existingItem){
            updateQuantity(existingItem.id, 1);
            return;
        }

        const newItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };
        
        setItems([newItem, ...items]);
    };

    // fn for updating of quantity or deleting from cart
    const updateQuantity =  (itemId: string, amount: -1 | 1) => {
        const updatedItems = items.map(item => item.id !== itemId ? item : {...item, quantity: item.quantity + amount}).filter(item => item.quantity > 0);
        
        setItems(updatedItems);
    }

    return (
        <CartContext.Provider value={{items, addItem, updateQuantity}}>
            {children}
        </CartContext.Provider>
    )
};

//for wrapping app
export default CartProvider;

//custom Hook for using cart context
export const useCart = () => useContext(CartContext); 