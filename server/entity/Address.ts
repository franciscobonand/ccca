export default class Address {
    constructor(
        readonly id: string = "",
        readonly postalcode: string,
    ) {}

    getShippingCost(): number {
        return 0;
    }
}
