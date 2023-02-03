export default class Address {
    constructor(
        readonly postalcode: string,
        readonly apt: string = "",
        readonly street: string = "",
        readonly city: string = "",
        readonly state: string = "",
        readonly country: string = "",
        public id?: string,
    ) {}

    getShippingCost(): number {
        return 0;
    }
}
