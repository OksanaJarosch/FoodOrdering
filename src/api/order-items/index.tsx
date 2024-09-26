import { supabase } from "@/src/lib/supabase";
import {InsertTables} from "@/src/types";
import { useMutation } from "@tanstack/react-query";

//add order-items
export const useInsertOrderItems = () => {

    return useMutation({
        async mutationFn(items: InsertTables<'order_items'>[]) {
            const {data: newOrder, error} = await supabase
                .from('order_items')
                .insert(items)
                .select()

                if (error) {
                    throw new Error(error.message);
                }
                return newOrder;
        },
    })
};