import { View, Text, Platform, FlatList } from 'react-native';
import { useCart } from '../providers/CartProvider';
import { StatusBar } from 'expo-status-bar';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';


const CartScreen = () => {
    const {items} = useCart();

    return (
        <View  style={{padding: 16, flex: 1, marginBottom: 16}}>
        <FlatList 
            data={items}
            renderItem={({item}) => <CartListItem cartItem={item}/>}
            contentContainerStyle={{padding: 10, gap: 10}}
        />
        <Button text='Checkout' style={{marginTop: 'auto'}}/>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen;