export default class Product {
    constructor(
        readonly id: string = "",
        readonly name: string,
        readonly description: string,
        readonly price: number,
        readonly qntAvailable: number,
    ) {
        if (this.qntAvailable < 0)
            throw new Error("Invalid qntAvailable, should be a positive integer");

        if (this.price < 0)
            throw new Error("Invalid price, should be greater than 0");

        this.qntAvailable = Math.floor(this.qntAvailable);
    }

    static isProduct(data: any): boolean {
        const validName = data.name && typeof data.name == "string";
        const validDescription = data.description && typeof data.description == "string";
        const validPrice = data.price && typeof data.price == "number";
        const validQntAvailable = data.qntAvailable && typeof data.qntAvailable == "number";
        return validName && validDescription && validPrice && validQntAvailable;
    }
}
