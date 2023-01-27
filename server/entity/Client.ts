import Address from "./Address";

export default class Client {
    addresses: Address[]

    constructor(
        readonly fullname: string,
        readonly cpf: string,
        address: Address
    ) {
        if (!this.isValidCPF(cpf))
            throw new Error("Invalid CPF");
        
        this.addresses = [address]
    }

    isValidCPF (cpf: string): boolean {
        cpf = cpf.replace(".","").replace("-","");

        if (cpf.length != 11) return false;
        if (this.allEqualDigits(cpf)) return false;

        let numeratorDigit1, numeratorDigit2, checkerDigit1, checkerDigit2; 
        numeratorDigit1 = numeratorDigit2 = checkerDigit1 = checkerDigit2 = 0;  

        for (let i = 1; i < cpf.length - 1; i++) {  
            const digit = parseInt(cpf[i]);  							
            numeratorDigit1 += (11 - i) * digit;  
            numeratorDigit2 += (12 - i) * digit;  
        };  

        const firstDigitRest = (numeratorDigit1 % 11);  
        checkerDigit1 = (firstDigitRest < 2) ? checkerDigit1 = 0 : 11 - firstDigitRest;  

        numeratorDigit2 += 2 * checkerDigit1;  
        const secondDigitRest = (numeratorDigit2 % 11);  
        checkerDigit2 = (secondDigitRest < 2) ? 0 : 11 - secondDigitRest; 

        const actualCheckerDigits = cpf.substring(cpf.length - 2, cpf.length);  
        const expectedCheckerDigits = checkerDigit1 + "" + checkerDigit2;  
        return actualCheckerDigits == expectedCheckerDigits;
    }

    private allEqualDigits(cpf: string): boolean {
        return cpf.split("").every(digit => digit === cpf[0]);
    }
}
