import { ActivityIndicator, FlatList, Text } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { useAdminOrderList } from '@/src/api/orders';
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';



const OrdersScreen = () => {
    const { data: orders, error, isLoading } = useAdminOrderList({ archived: false });

    useInsertOrderSubscription();


    if (isLoading) {
        return <ActivityIndicator />
    };
    
    if (error) {
        return <Text>Failed to fetch orders</Text>
    };

    return (
        <FlatList 
            data={orders}
            renderItem={({item}) => <OrderListItem order={item}/>}
            contentContainerStyle={{gap: 16 , padding: 16}}
        />
    );
}

export default OrdersScreen;