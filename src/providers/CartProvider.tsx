import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";


type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
}
const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
});

const CartProvider = ({children}: PropsWithChildren ) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {

        //! if already in cart, increment quantity

        const newItem: CartItem = {
            id: '', //generate later
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };
        
        setItems([newItem, ...items]);

        //! update quantity
    };

    return (
        <CartContext.Provider value={{items, addItem}}>
            {children}
        </CartContext.Provider>
    )
};

//for wrapping app
export default CartProvider;

//custom Hook for using cart context
export const useCart = () => useContext(CartContext); 