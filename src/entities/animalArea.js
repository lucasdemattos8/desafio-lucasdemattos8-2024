export class AnimalArea{
    // Construtor
    constructor(id, biome, size, occupantAnimals){
        this.#id = id;
        this.#biome = biome;
        this.#size = size;
        this.#occupantAnimals = occupantAnimals;
    }

    // Atributos encapsulados
  
    #id;
    #biome;
    #size;
    #occupantAnimals;
    
    // Getters e Setters

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get biome(){
        return this.#biome;
    }

    set biome(biome){
        this.#biome = biome;
    }

    get size(){
        return this.#size;
    }

    set size(size){
        this.#size = size;
    }

    get occupantAnimals(){
        return this.#occupantAnimals;
    }

    // Métodos personalizados

    spaceUsed(){
        var spaceUsed = this.#occupantAnimals.reduce((currentSize, totalSize) => currentSize + totalSize.size, 0);
        var prevAnimal = null;

        // Verifica se há outro tipo de espécie de animal para incrementar +1;
        for(let i = 0; i < this.#occupantAnimals.length; i++){
            let actualAnimal = this.#occupantAnimals[i].species;

            if (prevAnimal != null){
                if (prevAnimal != actualAnimal){
                    spaceUsed = spaceUsed + 1;
                    break;
                }
            }
            prevAnimal = this.#occupantAnimals[i].species;
        }
        return spaceUsed;
    }
    
    verifyAvaibleSpace() {
        var spaceUsed = this.spaceUsed();
        return this.#size - spaceUsed;
    }
  
    toString(){
        return `Recinto ID: ${this.#id}, Bioma: ${this.#biome}, Tamanho: ${this.#size}, Animais: ${this.#occupantAnimals.join(', ')}\n`;
    }

    info(){
        return `Recinto ${this.#id} (espaço livre: ${this.verifyAvaibleSpace()} total: ${this.#size})`
    }
}