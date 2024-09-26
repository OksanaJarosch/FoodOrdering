import { supabase } from "@/src/lib/supabase"
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {InsertTables} from "@/src/types";



//fetch all orders
export const useAdminOrderList = ({archived = false}) => {
    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];
    return useQuery({
        queryKey: ['orders', {archived}],
        queryFn: async() => {
            const {error, data} = await supabase.from('orders').select('*').in('status', statuses);
            if (error) {
                console.log(error);
                
                throw new Error(error.message);
            };
            return data;
        }
    })
};

//fetch my orders
export const useMyOrderList = () => {
    //to find user id
    const {session} = useAuth();
    const id = session?.user.id;

    return useQuery({
        queryKey: ['orders', {userId: id}],
        queryFn: async() => {
            if (!id) return null;

            const { error, data } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', id)
                .order('created_at', {ascending: false});
            if (error) {
                throw new Error(error.message);
            };
            return data;
        }
    })
};

//fetch one order
export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async() => {
            const { data, error } = await supabase
                .from('orders')
                .select('*, order_items(*, products(*))')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
    })
};

//add order
export const useInsertOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: InsertTables<'orders'>) {
            const {data: newOrder, error} = await supabase
                .from('orders')
                .insert(data)
                .select()
                .single();

                if (error) {
                    throw new Error(error.message);
                }
                return newOrder;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    })
};