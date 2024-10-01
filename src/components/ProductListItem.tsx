import Colors from '@/src/constants/Colors';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Tables } from '@/src/types';
import { Link } from 'expo-router';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Tables<'products'>;
}

export const ProductListItem = ({product}: ProductListItemProps) => {

    return (
        <Link href={`/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <RemoteImage
                    path={product.image}
                    fallback={defaultPizzaImage}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </Pressable>
        </Link>
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