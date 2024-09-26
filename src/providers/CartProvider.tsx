import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Tables } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useAuth } from "./AuthProvider";
import { router } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";


type CartType = {
    items: CartItem[];
    addItem: (product: Tables<'products'>, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
    checkout: () => void;
}

//context
const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
    checkout: () => {},
});

//provider
const CartProvider = ({children}: PropsWithChildren ) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const {mutate: insertOrder} = useInsertOrder();
    const {mutate: insertOrderItems} = useInsertOrderItems();

    const {session} = useAuth();
    const userId = session?.user.id;

    //fn for adding to cart
    const addItem = (product: Tables<'products'>, size: CartItem['size']) => {
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
    };

    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0);

    const clearCart = () => {
        setItems([]);
    };

    //fn for sending order
    const checkout = () => {
        insertOrder({
            total,
            user_id: userId || '',
        },
        {onSuccess: saveOrderItems}
    )};

    //save order items
    const saveOrderItems = (order: Tables<'orders'>) => {

        const orderItems = items.map(cartItem => ({
            order_id: order.id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            size: cartItem.size,
        }))

        insertOrderItems(orderItems, {onSuccess() {
            clearCart();
            router.push(`/(user)/orders/${order.id}`);
        }});
        
    }

    return (
        <CartContext.Provider value={{items, addItem, updateQuantity, total, checkout}}>
            {children}
        </CartContext.Provider>
    )
};

//for wrapping app
export default CartProvider;

//custom Hook for using cart context
export const useCart = () => useContext(CartContext); 