import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';
import { Link } from 'expo-router';
import { supabase } from '@/src/lib/supabase';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSignIn = async() => {
        setLoading(true);
        const {error} = await supabase.auth.signInWithPassword({email, password});
        
        if (error) alert(error.message);
        setLoading(false);
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

            <Button text={loading ? 'Signing in...' : 'Sign in'} disabled={loading} onPress={onSignIn}/>
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