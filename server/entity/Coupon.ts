export default class Coupon {
    constructor(
        readonly name: string,
        readonly discount: number,
    ) {
        if (discount <= 0 || discount >= 1)
            throw new Error("Invalid discount, should be between 0 and 1");
    }
}
