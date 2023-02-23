export default class Product {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly description: string,
        readonly price: number,
    ) {
        if (this.price < 0)
            throw new Error("Invalid price, should be greater than 0");
    }
}
