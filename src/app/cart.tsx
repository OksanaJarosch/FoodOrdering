import { View, Text, Platform } from 'react-native';
import { useCart } from '../providers/CartProvider';
import { StatusBar } from 'expo-status-bar';


const CartScreen = () => {
    const {items} = useCart();

    return (
        <View>
        <Text>Items length: {items.length}</Text>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen;