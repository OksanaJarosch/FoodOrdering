import { useOrder } from '@/src/api/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrdersItem from '@/src/components/OrdersItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';



const OrderDetailsScreen = () => {
    const {id} = useLocalSearchParams();
    const {data: order, isLoading, error} = useOrder(+id);

    if (isLoading) {
        return <ActivityIndicator />
    };
    
    if (error) {
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