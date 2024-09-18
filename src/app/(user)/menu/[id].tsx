import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router' 
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { useProduct } from '@/src/api/products';


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const {id} = useLocalSearchParams();
  const {data: product, error, isLoading} = useProduct(+id);
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

  if (error) {
    return <Text>Failed to fetch product</Text>
  };


  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.name}} />

      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image}/>
      <Text style={styles.text}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map(size => (
          <Pressable onPress={() => {setSelectedSize(size)}} key={size} style={[styles.size, {backgroundColor: selectedSize === size ? 'gainsboro' : 'transparent'}]}>
            <Text style={[styles.sizeText, {color: selectedSize === size ? 'black' : 'gray'}]}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price.toFixed(2) }</Text>
      <Button text='Add to cart' onPress={addToCart}/>
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
    marginTop: 'auto',
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
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  }
} )

export default ProductDetailsScreen