import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';
import { Link } from 'expo-router';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateInput = () => {
        setError('');
        
        if (!email) {
            setError('Email is required');
            return false;
        };

        if (!password) {
            setError('Password is required');
            return false;
        };

        return true;
    };

    const resetFields = () => {
        setEmail('');
        setError('');
    };

    const onSignIn = () => {
        if(!validateInput()) {
            return;
        }
        console.warn('Sign in');
        resetFields();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.lable}>Email</Text>
            <TextInput 
                style={styles.input} 
                placeholder='abc@gmail.com'
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.lable}>Password</Text>
            <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Text style={styles.error}>{error}</Text>
            <Button text='Sign in' onPress={onSignIn}/>
            <Link href={'/sign-up'} asChild>
                <Text style={styles.textBtn}>Create an account</Text>
            </Link>
        </View>
    )
};

export default SignInScreen;

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