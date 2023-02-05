export default class Coupon {
    constructor(
        readonly id: string = "",
        readonly name: string,
        readonly discount: number,
    ) {
        if (discount <= 0 || discount >= 1)
            throw new Error("Invalid discount, should be between 0 and 1");
    }

    returnDiscount(): number {
        return this.discount;
    }

    static isCoupon(data: any): boolean {
        const validName = data.name && typeof data.name == "string";
        const validDiscount = data.discount && typeof data.discount == "number";
        return validDiscount && validName;
    }
}
