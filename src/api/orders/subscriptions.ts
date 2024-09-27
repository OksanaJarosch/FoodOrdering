import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


//Subscription to orders inserts (from Supabase Docs)
export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient();

        useEffect(() => {
            const ordersSubscription = supabase.channel('custom-insert-channel')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'orders' },
                    () => {
                        queryClient.invalidateQueries({ queryKey: ['orders'] });
                    }
                )
                .subscribe();
        
        return () => {
            ordersSubscription.unsubscribe();
        }
    }, []);
};

//Subscription to orders updates (from Supabase Docs)
export const useUpdateOrderSubscription = (id: number) => {
    const queryClient = useQueryClient();

        useEffect(() => {
            const ordersSubscription = supabase.channel('custom-filter-channel')
                .on(
                    'postgres_changes',
                    {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'orders',
                        filter: `id=eq.${id}`,
                    },
                    () => {
                        queryClient.invalidateQueries({ queryKey: ['orders', id] });
                    }
                )
                .subscribe();
        
        return () => {
            ordersSubscription.unsubscribe();
        }
    }, []);
};