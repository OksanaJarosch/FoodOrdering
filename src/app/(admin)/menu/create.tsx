import { View, Text, StyleSheet, TextInput, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products';


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { id: stringId } = useLocalSearchParams();
    const parsedId = Array.isArray(stringId) ? stringId[0] : stringId;
    const id = Number(parsedId);

    const isUpdating = !!id;
    const router = useRouter();

    const {mutate: insertProduct} = useInsertProduct();
    const {mutate: updateProduct} = useUpdateProduct();
    const {mutate: deleteProduct} = useDeleteProduct();
    const {data: updatingProduct} = useProduct(id);

    useEffect(() => {
        if (updatingProduct) {
            setName(updatingProduct.name);
            setImage(updatingProduct.image);
            setPrice(updatingProduct.price.toString());
        };
    }, [updatingProduct]);

    const validateInput = () => {
        setErrors('');
        
        if (!name) {
            setErrors('Name is required');
            return false;
        };

        if (!price) {
            setErrors('Price is required');
            return false;
        };

        return true;
    };

    const onCreate = () => {
        if(!validateInput()) {
            return;
        };
        setIsLoading(true);
        //add to database
        insertProduct({name, price: parseFloat(price), image},
            {onSuccess: () => {
                setIsLoading(false);
                router.back();
            }}
    )};

    const onUpdate = () => {
        if(!validateInput()) {
            return;
        };
        setIsLoading(true);
        //add to database
        updateProduct({ id, name, price: parseFloat(price), image},
        {onSuccess: () => {
            setIsLoading(false);
            router.back();
        }}
)};

    const onSubmit = () => {
        isUpdating ? onUpdate() : onCreate();
    };

    const onDelete = () => {
        setIsLoading(true);
        
        deleteProduct(id,
            {onSuccess: () => {
                setIsLoading(false);
                router.replace('/(admin)');
            }})
    };

    const confirmDelete = () => {
        Alert.alert('Confirm' , 'Are you sure you want delete this product?', [{
            text: 'Cancel',
        },
        {
            text: 'Delete',
            style: 'destructive',
            onPress: onDelete,
        }])
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    if (isLoading) {
        return <ActivityIndicator />
    }


    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdating ? 'Update Product' : 'Create Product'}}/>

            <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
            <Text style={styles.textBtn} onPress={pickImage}>Select Image</Text>

            <Text style={styles.lable}>Name</Text>
            <TextInput 
                value={name}
                onChangeText={setName}
                placeholder="Name" 
                style={styles.input}
            />

            <Text style={styles.lable}>Price ($)</Text>
            <TextInput 
                value={price}
                onChangeText={setPrice}
                placeholder="9.99" 
                style={styles.input} 
                keyboardType='numeric'
            />

            <Text style={styles.error}>{errors}</Text>
            <Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit}/>
            {isUpdating && <Text onPress={confirmDelete} style={styles.textBtn}>Delete</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 5,
        marginTop: 8,
        marginBottom: 20,
    },
    lable: {
        color: 'gray',
        fontSize: 16,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textBtn: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    error: {
        color: 'red',
    }
})

export default CreateProductScreen;