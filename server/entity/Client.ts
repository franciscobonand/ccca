import Address from "./Address";

export default class Client {
    cpf: string
    addresses: Address[]

    constructor(
        readonly fullname: string,
        cpf: string,
        address: Address
    ) {
        const formatedCPF = cpf.replace(/\D/g, "");
        if (!this.isValidCPF(formatedCPF))
            throw new Error("Invalid CPF");
        
        this.addresses = [address]
        this.cpf = formatedCPF
    }

    isValidCPF (cpf: string): boolean {
        if (cpf.length != 11) return false;
        if (this.allEqualDigits(cpf)) return false;

        const expectedCheckerDigits = this.getCPFCheckerDigits(cpf); 
        const actualCheckerDigits = cpf.substring(cpf.length - 2, cpf.length);  
        return actualCheckerDigits == expectedCheckerDigits;
    }

    private allEqualDigits(cpf: string): boolean {
        return cpf.split("").every(digit => digit === cpf[0]);
    }

    private getCPFCheckerDigits(cpf: string): string {
        const cpfNonVerifyingDigits = 9
        let numeratorDigit1 = 0;
        let numeratorDigit2 = 0;

        for (let i = 0; i < cpfNonVerifyingDigits; i++) {  
            const digit = parseInt(cpf[i]);  							
            numeratorDigit1 += (10 - i) * digit;  
            numeratorDigit2 += (11 - i) * digit;  
        };  

        const firstDigitRest = (numeratorDigit1 % 11);  
        const checkerDigit1 = (firstDigitRest < 2) ? 0 : 11 - firstDigitRest;  

        numeratorDigit2 += 2 * checkerDigit1;  
        const secondDigitRest = (numeratorDigit2 % 11);  
        const checkerDigit2 = (secondDigitRest < 2) ? 0 : 11 - secondDigitRest; 

        return `${checkerDigit1}${checkerDigit2}`;
    }
}
