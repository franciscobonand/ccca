export default class Coupon {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly discount: number,
        readonly expireDate: Date,
    ) {
        if (discount <= 0.01 || discount >= 1)
            throw new Error("Invalid discount, should be between 0 and 1");
    }

    isExpired(date: Date): boolean {
        return this.expireDate.getTime() < date.getTime();
    }
}
