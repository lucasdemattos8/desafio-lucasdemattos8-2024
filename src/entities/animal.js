export class Animal{
    // Construtor
    constructor(species, size, biome){
        this.#species = species;
        this.#size = size;
        this.#biome = biome;
    }

    // Atributos encapsulados

    #species;
    #size;
    #biome;

    // Getters necessários
    
    get species(){
        return this.#species;
    }

    get size(){
        return this.#size;
    }

    get biome(){
        return this.#biome;
    }
}