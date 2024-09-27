import { useOrderDetails } from '@/src/api/orders';
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions';
import OrderListItem from '@/src/components/OrderListItem';
import OrdersItem from '@/src/components/OrdersItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';


const OrderDetailsScreen = () => {
    const { id: stringId } = useLocalSearchParams();
    const id = Number(stringId);
    const {data: order, isLoading, error} = useOrderDetails(id);

    useUpdateOrderSubscription(id);

    if (isLoading) {
        return <ActivityIndicator />
    };
    
    if (error || !order) {
        return <Text>Failed to fetch order</Text>
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: `Order #${id}`}}/>

            <FlatList
                // ListHeaderComponent to scrolling with FlatList together
                ListHeaderComponent={() => <OrderListItem order={order}/>}
                data={order.order_items}
                renderItem={({item}) => <OrdersItem item={item}/>}
                contentContainerStyle={{gap: 10}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
});

export default OrderDetailsScreen;