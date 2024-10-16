import { useOrderDetails, useUpdateOrder } from '@/src/api/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrdersItem from '@/src/components/OrdersItem';
import Colors from '@/src/constants/Colors';
import { notifyUserAboutOrderUpdate } from '@/src/lib/notifications';
import { OrderStatusList } from '@/src/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native';



const OrderDetailsScreen = () => {
    const { id: stringId } = useLocalSearchParams();
    const parsedId = Array.isArray(stringId) ? stringId[0] : stringId;
    const id = Number(parsedId);

    const { data: order, isLoading, error } = useOrderDetails(id);
    const { mutate: updateOrder } = useUpdateOrder();

    const updateStatus = async (status: string) => {
        updateOrder({ id, updatedFields: { status } })
        if (order) {
            await notifyUserAboutOrderUpdate({...order, status});
        };
    };

    if (isLoading) {
        return <ActivityIndicator />
    };
    
    if (error) {
        return <Text>Failed to fetch order</Text>
    };

    if (!order) {
        return <Text>Not found</Text>
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
                ListFooterComponent={() => (
                    <>
                        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Status</Text>
                        <View style={styles.statusContainer}>
                            {OrderStatusList.map((status) => (
                                <Pressable
                                    key={status}
                                    onPress={() => updateStatus(status)}
                                    style={{
                                        borderColor: Colors.light.tint,
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 5,
                                        marginVertical: 10,
                                        backgroundColor:
                                            order.status === status
                                            ? Colors.light.tint
                                            : 'transparent',
                                    }}
                                >
                                    <Text
                                    style={{
                                        color:
                                        order.status === status ? 'white' : Colors.light.tint,
                                    }}
                                    >
                                    {status}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </>

                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
    statusContainer: {
        flexDirection: 'row',
        gap: 10,
    }
});

export default OrderDetailsScreen;