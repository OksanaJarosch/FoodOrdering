import Colors from '@/src/constants/Colors';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '@/src/types';

const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Product;
}

export const ProductListItem = ({product}: ProductListItemProps) => {
    return (
        <View style={styles.container}>
            <Image
                source={{uri: product.image || defaultPizzaImage}}
                style={styles.image}
                resizeMode='contain'
            />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '50%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});