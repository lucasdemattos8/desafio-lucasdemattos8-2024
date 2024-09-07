export class Animal{
    constructor(species, size, biome){
        this.#species = species;
        this.#size = size;
        this.#biome = biome;
    }

    #species;
    #size;
    #biome;

    get species(){
        return this.#species;
    }

    set species(species){
        this.#species = species;
    }

    get size(){
        return this.#size;
    }

    set size(size){
        this.#size = size;
    }

    get biome(){
        return this.#biome;
    }

    set biome(biome){
        this.#biome = biome;
    }

    toString(){
        return `Espécie: ${this.#species}, tamanho: ${this.size}, bioma: ${this.#biome}`
    }
}