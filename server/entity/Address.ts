export default class Address {
    constructor(
        readonly id: string = "",
        readonly postalcode: string,
    ) {}

    getShippingCost(): number {
        return 0;
    }

    static isAddress(data: any): boolean {
        const validPostalcode = data.postalcode && typeof data.postalcode == "string";
        return validPostalcode;
    }
}
