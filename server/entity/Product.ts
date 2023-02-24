export default class Product {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly description: string,
        readonly price: number,
        readonly width: number,
        readonly height: number,
        readonly length: number,
        readonly weight: number,
    ) {
        if (this.price < 0)
            throw new Error("Invalid price, should be greater than 0");
        if (this.width < 0 || this.height < 0 || this.length < 0)
            throw new Error("Invalid dimentions, should be greater than 0");
        if (this.weight < 0)
            throw new Error("Invalid weight, should be greater than 0");
    }

    getVolume(): number {
        return (this.width / 100) * (this.height / 100) * (this.length / 100);
    }

    getDensity(): number {
        return this.weight / this.getVolume();
    }
}
