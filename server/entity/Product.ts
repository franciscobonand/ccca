export default class Product {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly price: number,
        readonly qntAvailable: number,
        public id?: string,
    ) {
        if (!Number.isInteger(this.qntAvailable) || this.qntAvailable < 0)
            throw new Error("Invalid qntAvailable, should be a positive integer");
    }
}
