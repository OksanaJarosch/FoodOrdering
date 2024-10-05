import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Profile } from "../types";


type AuthData = {
    session: Session|null;
    profile: Profile|null;
    loading: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
    isAdmin: false,
});

const AuthProvider = ({children}: PropsWithChildren) => {
    const [session, setSession] = useState<Session|null>(null);
    const [profile, setProfile] = useState<Profile|null>(null);
    const [loading, setLoading] = useState(true);

    // Fn, fetch actual user profile
    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
        } else {
            setProfile(data || null);
        }
    };
    // Fn, fetch session 
        const fetchSession = async () => {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Error fetching session:", error);
        };
        setSession(session);
            if (session) {
            fetchProfile(session.user.id);
        };
        setLoading(false);
    };

    useEffect(() => {
        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange( async(_event, session) => {
            setSession(session);

            if (session) {
                await fetchProfile(session.user.id); // new profile or...
            } else {
                setProfile(null); // to avoid remaining old profile in state
            }
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, [])
    
    return (
        <AuthContext.Provider value={{session, profile, loading, isAdmin: profile?.group === 'ADMIN'}}>
            {children}
        </AuthContext.Provider>
)};

//for wrapping app
export default AuthProvider;

//custom Hook for using auth context
export const useAuth = () => useContext(AuthContext);