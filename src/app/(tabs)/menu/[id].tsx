import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';


const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const {id} = useLocalSearchParams();
  const product = products.find(p => p.id.toString() === id);
  
  const [selectedSize, setSelectedSize] = useState('M');

  const addToCart = () => {
    console.warn('Adding to cart: size: ', selectedSize)
  }

  if (!product) {
    return <Text>Product not found</Text>
  }

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
      <Text style={styles.price}>${product.price}</Text>
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