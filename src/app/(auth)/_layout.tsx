import { useAuth } from '@/src/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';


export default function AuthLayout() {
    const {session, isAdmin} = useAuth();

    if (session) {
        if (isAdmin) {
            return <Redirect href={'/(admin)'}/>;
        }
        return <Redirect href={'/(user)'}/>;
    };

    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
            <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
        </Stack>
    );
}