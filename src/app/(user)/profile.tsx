import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Link } from "expo-router";
import { View, Button, Text } from "react-native";
import CustomButton from '@/src/components/Button';


const ProfileScreen = () => {
    const { session, profile} = useAuth();
    const user = session?.user.user_metadata?.email;
    const role = profile?.group;

    return (
        <View style={{
            flex: 1,
            justifyContent: 'space-between',
            padding: 36,
        }}>
            <View>
                <Text style={{ marginHorizontal: 'auto', marginBottom: 16 }}>Hello, {user}</Text>
                {role === 'ADMIN' && 
                    <View>
                        <Text style={{ marginHorizontal: 'auto' }}>You are {role}</Text>
                        <Link href={'/(admin)'} asChild>
                            <CustomButton text='Go to Admin Side'/>
                        </Link>
                    </View>
                    
                } 
            </View>

            <Button title='Sign out' onPress={async() => await supabase.auth.signOut()}/>
        </View>
    )
};

export default ProfileScreen;