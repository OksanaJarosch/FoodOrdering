import { FlatList } from 'react-native';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';



const OrdersScreen = () => {
    return (
        <FlatList 
            data={orders}
            renderItem={({item}) => <OrderListItem order={item}/>}
            contentContainerStyle={{gap: 16 , padding: 16}}
        />
    );
}

export default OrdersScreen;