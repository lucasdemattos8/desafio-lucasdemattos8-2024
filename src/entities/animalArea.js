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
    
    // Getters necessários

    get biome(){
        return this.#biome;
    }

    get occupantAnimals(){
        return this.#occupantAnimals;
    }

    // Métodos personalizados

    /**
     * Este método tem como objetivo verificar o espaço utilizado pelos animais ocupantes do recinto
     * levando em consideração o bônus de +1, se houver diferentes de espécies.
     * @return retorna um valor inteiro representando o espaço OCUPADO no recinto
    */
    spaceUsed(){
        let spaceUsed = this.#occupantAnimals.reduce((currentSize, totalSize) => currentSize + totalSize.size, 0);
        let prevAnimal = null;

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
    
    /**
     * Este método tem como objetivo verificar o atual espaço disponivel no recinto
     * @return retorna um valor inteiro representando o espaço LIVRE
    */
    verifyAvaibleSpace() {
        let spaceUsed = this.spaceUsed();
        return this.#size - spaceUsed;
    }

    /**
     * Este método tem como objetivo criar a representação em STRING do objeto de recinto
     * @return retorna uma STRING com informações do recinto
    */
    info(){
        return `Recinto ${this.#id} (espaço livre: ${this.verifyAvaibleSpace()} total: ${this.#size})`
    }
}