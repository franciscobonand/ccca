import Coupon from '../entity/Coupon';
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const couponMutation = router({
    createCoupon: publicProcedure
        .input(
            z.object({
                name: z.string().min(2).max(15),
                discount: z.number().min(0.01).max(1),
            }),
        )
        .mutation(({ input, ctx }) => {
            try {
                const coupon = new Coupon(input.name, input.discount); 
                // save to DB
            } catch (error) {
                // return error              
            }
        })
});
