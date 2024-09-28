import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';


const ProductDetailsScreen = () => {
  const { id: stringId } = useLocalSearchParams();
  const parsedId = Array.isArray(stringId) ? stringId[0] : stringId;
  const id = Number(parsedId);
  
  const {data: product, error, isLoading} = useProduct(id);
  const {addItem} = useCart();
  const router = useRouter();
  
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const addToCart = () => {
    if (!product) return;

    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (isLoading) {
    return <ActivityIndicator />
  };

  if (error || !product) {
    return <Text>Failed to fetch product</Text>
  };

  return (
    <View style={styles.container}>

<Stack.Screen options={{
                title: product.name,
                headerRight: () => (
                    <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                            <FontAwesome
                                name="pencil"
                                size={25}
                                color={Colors.light.tint}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}/>

      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image}/>
      <Text style={styles.itemName}>{product.name }</Text>
      <Text style={styles.price}>${product.price.toFixed(2) }</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 20,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  }
} )

export default ProductDetailsScreen