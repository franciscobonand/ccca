export default class Address {
    constructor(
        public postalcode: string,
        public apt: string = "",
        public street: string = "",
        public city: string = "",
        public state: string = "",
        public country: string = ""
    ) {}
}
