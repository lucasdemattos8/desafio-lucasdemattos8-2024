import { AnimalArea } from "./entities/animalArea.js";
import { Animal } from "./entities/animal.js"; 

/*
Este código foi desenvolvido durante um desafio técnico para a DB-Tecnologia. Foi extremamente divertido trabalhar nesse desafio,
que envolveu a criação e gerenciamento de recintos para animais com base em critérios específicos. Ao longo do processo, consegui
aplicar conceitos de Programação Orientada a Objetos (POO), funções de ordem superior em arrays e encapsulamento.

Além disso, tive a oportunidade de enfrentar e superar desafios técnicos, aprimorando minhas habilidades em desenvolvimento (JS)
e testando minha capacidade de resolver problemas complexos.

O desafio proporcionou um aprendizado valioso e uma experiência muito bacana!.

- Desenvolvido por: Lucas de Mattos Miranda, 08/09/2024
*/

class RecintosZoo {
    constructor(){
        // Injeção de dados no construtor
        const leao = new Animal("LEAO", 3, ["savana"]);
        const leopardo = new Animal("LEOPARDO", 2, ["savana"]);
        const crocodilo = new Animal("CROCODILO", 3, ["rio"]);
        const macaco = new Animal("MACACO", 1, ["savana", "floresta"]);
        const gazela = new Animal("GAZELA", 2, ["savana"]);
        const hipopotamo = new Animal("HIPOPOTAMO", 4, ["savana", "rio"]);
        this.#speciesList = [leao, leopardo, crocodilo, macaco, gazela, hipopotamo];

        var animalAreas = []
        animalAreas.push(new AnimalArea(1, ["savana"], 10, [macaco, macaco, macaco]));
        animalAreas.push(new AnimalArea(2, ["floresta"], 5, []));
        animalAreas.push(new AnimalArea(3, ["savana", "rio"], 7, [gazela]));
        animalAreas.push(new AnimalArea(4, ["rio"], 8, []));
        animalAreas.push(new AnimalArea(5, ["savana"], 9, [leao]));
        this.#animalAreas = animalAreas;
    }

    #speciesList;
    #animalAreas;   

    // Método principal
    analisaRecintos(animal, quantidade) {
        
        const animalObject = this.validateValues(animal, quantidade);

        if (animalObject.erro){
            return { erro: animalObject.erro };
        }

        let compatibleAreas = [];
        // (ForEach) Verifica se o animal selecionado é compativel em algum bioma e insere no array "possibleHabitats";
        this.#animalAreas.forEach((animalArea) => {
            compatibleAreas = this.findCompatibleAreas(animalArea, animalObject, quantidade, compatibleAreas);
        });

        animalObject.recintosViaveis = compatibleAreas.map((habitatInfo => habitatInfo.info()));
        if (animalObject.recintosViaveis.length === 0){
            return { erro: "Não há recinto viável" };
        }
        else{
            return animalObject;
        }
    }

    // Métodos auxiliares

    /**
     * Função encarregada com a lógica de fornecer uma lista de recintos compativeis
     * com o animal passado pelo parametro de "animalObject"
     * @param animalArea STRING de animal a ser validado/convertido;
     * @param animalObject OBJECT da classe do tipo Animal a ser validado
     * @param quantity INT de quantidade de animais
     * @param possibleHabitats ARRAY encarregado de armazenar os recintos possiveis
     * @return possibleHabitats - retorna um array com os recintos possíveis
    */
    findCompatibleAreas(animalArea, animalObject, quantity, compatibleAreas){        
        if (animalArea.biome.some(biome => animalObject.biome.includes(biome))){
            let availableSpace = animalArea.verifyAvaibleSpace();
            const expectedUsage = animalObject.size * quantity;

            availableSpace = availableSpace - expectedUsage;
            
            // Verificação para condições específicas dos animais;
            if (this.verifyAnimalConditionals(animalObject, animalArea, quantity)){
                // Verificação para condição de espaço necessário;
                if (availableSpace >= 0){
                    animalArea = this.addAnimalToArea(animalArea, animalObject, quantity);
                    // Verificação para garantir o espaço necessário mesmo com bônus de espaço para especies diferentes;
                    if (animalArea.verifyAvaibleSpace() >= 0){
                        compatibleAreas.push(animalArea);
                    }
                }
            }
        }
        return compatibleAreas;
    }

    /**
     * Verifica se os valores informados realmente são os valores esperados.
     * @param specie STRING de animal a ser validado/convertido;
     * @param quantity int de quantidade de animais
     * @return Animal - retorna um Object(Animal) 
    */
    validateValues(specie, quantity){
        // Verifica se o animal enviado pelo parametro é válido;
        const animalObject = this.validateAnimal(specie);

        // Verificar se obteve um erro na validação do objeto;
        if(animalObject.erro){
            return { erro: animalObject.erro };
        }

        // Verifica se o valor obtido é númerico;
        if(typeof quantity !== 'number'){
            return {erro : "A quantidade fornecida deve ser um Número"}
        }

        // Verifica se o valor obtido na quantidade é válido;
        if(quantity <= 0){
            return {erro : "Quantidade inválida"};
        }
        return animalObject;
    }
    

    /**
     * Este método tem como objetivo validar e converter a STRING de nome passada no parametro para OBJETO dos animais listados
     * no construtor da classe "RecintosZoo", caso ele não encontre retorna um erro: "Animal inválido".
     * @param specie STRING de animal a ser validado/convertido;
     * @return Animal - retorna um Object(Animal) 
    */
    validateAnimal(specie){
        // Verificação para o tipo informado
        if(typeof specie !== 'string'){
            return { erro: "A espécie fornecida deve ser uma String"}
        }
        specie = specie.toUpperCase();
        const animalExists = this.#speciesList.find(animal => animal.species === specie);
        if (animalExists){
            return animalExists;
        } 
        else{
            return { erro: "Animal inválido" };    
        }
    }

    /**
     * Este método tem como objetivo adicionar os animalObjects no seu devido recinto com a quantidade informada pelo
     * parametro passado
     * @param animalArea Recinto de animais para receber novos animais (objetos)
     * @param animalObject Espécie de animal (objeto) a ser inserido no recinto
     * @param quantidade Quantidade de animais a serem adicionados
     * @return animalArea Retorna o mesmo recinto, porém com os objetos informados adicionados com base na quantidade informada.
    */
    addAnimalToArea(animalArea, animalObject, quantidade){
        for (let i = 0; i < quantidade; i++){
            animalArea.occupantAnimals.push(animalObject);
        }
        return animalArea;
    }

    /**
     * Este método tem como objetivo verificar as condições de cada individualidade dos animais, o retorno LÓGICO (bool)
     * da função tem como base o status da condição do objeto referido
     * @param animalObject Espécie de animal (objeto) a verificar as condições
     * @param animalArea Recinto de animais para receber novos animais (objetos)
     * @param quantidade Quantidade de animais a serem adicionados
     * @return boolean Retorna verdadeiro caso a individualidade do animal seja satisfeita, caso contrário falso.
    */
    verifyAnimalConditionals(animalObject, animalArea, quantidade){
        const carnivoreAnimals = ["LEAO", "LEOPARDO", "CROCODILO"];
        let animals = animalArea.occupantAnimals;
        let findCarnivoreAnimal = carnivoreAnimals.some(
            animalCarnivore => animalArea.occupantAnimals.find(animal => animal.species === animalCarnivore));

        switch (animalObject.species){
            case ("LEAO"):
            case ("LEOPARDO"):
            case ("CROCODILO"):
                return this.verifyCarnivoreConditionals(animalObject, animals, findCarnivoreAnimal);
            case ("MACACO"):
                return this.verifyMonkeyConditionals(findCarnivoreAnimal, animals, quantidade);
            case ("HIPOPOTAMO"):
                return this.verifyHippoConditionals(animals, animalArea, findCarnivoreAnimal);
            default:
                // Caso encontre uma ocorrência de animal carnivoro em um recinto retorna false, ou seja, um recinto inválido para animais pacificos;
                if (findCarnivoreAnimal){
                    return false;
                }
                return true;
        }
    }

    /**
     * Este método tem como objetivo verificar as condições de ANIMAIS CARNIVOROS, o retorno LÓGICO (bool)
     * da função tem como base o status da condição do objeto referido
     * @param animalObject Espécie de animal (objeto) a verificar as condições
     * @param animals Array dos animais presentes no recinto a ser verificado
     * @param findCarnivoreAnimal Boolean baseado na presença de um animal carnivoro no recinto
     * @return boolean Retorna verdadeiro caso a individualidade do animal seja satisfeita, caso contrário falso.
    */
    verifyCarnivoreConditionals(animalObject, animals, findCarnivoreAnimal){
        // Verifica a ocorrencia de animais carnivoros DIFERENTES em seus recintos
        for(let i = 0; i < animals.length; i++){
            if (animals[i] != animalObject){
                return false;
            }
        }
        return true;
    }

    /**
     * Este método tem como objetivo verificar as condições dos MACACOS, o retorno LÓGICO (bool)
     * da função tem como base o status da condição do objeto referido
     * @param findCarnivoreAnimal Boolean baseado na presença de um animal carnivoro no recinto
     * @param animals Array dos animais presentes no recinto a ser verificado
     * @param quantidade Quantidade de animais a serem adicionados
     * @return boolean Retorna verdadeiro caso a individualidade do animal seja satisfeita, caso contrário falso.
    */
    verifyMonkeyConditionals(findCarnivoreAnimal, animals, quantity){
        // Verifica se há algum outro animal presente no recinto, e que ele seja obrigatoriamente pacifico;
        if(findCarnivoreAnimal){
            return false;
        }
        // Verifica se ele não vai ser inserido com algum(ns) companheiro(s);
        if(quantity >= 2){
            return true;
        }
        // Verifica se NÃO há a presença de outros animais;
        if(animals.length === 0){
            return false;
        }
        return true;
    }

    /**
     * Este método tem como objetivo verificar as condições dos MACACOS, o retorno LÓGICO (bool)
     * da função tem como base o status da condição do objeto referido
     * @param animals Array dos animais presentes no recinto a ser verificado
     * @param animalArea Objeto(AnimalArea) Recinto de animais para verificar seu bioma
     * @param findCarnivoreAnimal Boolean baseado na presença de um animal carnivoro no recinto
     * @return boolean Retorna verdadeiro caso a individualidade do animal seja satisfeita, caso contrário falso.
    */
    verifyHippoConditionals(animals, animalArea, findCarnivoreAnimal){
        let hipopotamoSafeBiome = ["savana", "rio"];
        // Verifica se há algum outro animal presente no recinto, e que ele seja obrigatoriamente pacifico;
        if(findCarnivoreAnimal){
            return false;
        }
        // Verifica se o bioma do recinto é compativel com os "safe Biomes" do hipopotamo;
        let doesBiomesHaveTheSameSize = animalArea.biome.length === hipopotamoSafeBiome.length;
        
        if(doesBiomesHaveTheSameSize && animalArea.biome.every(biome => hipopotamoSafeBiome.includes(biome))){
            return true;
        }
        if(animals.length === 0){
            return true;
        }
        if(animals.length > 0){
            return false;
        }
    }

    // Métodos para TESTES

    /**
     * Este método tem como objetivo adicionar um novo recinto no vetor de recintos do objeto "RecintosZoo" a caracter de TESTES
     * de algumas condições que podem não ser alcançadas com os dados atuais fornecidos
     * @param id INT id do bioma
     * @param biomes Array[String] representação dos biomas presentes no recinto
     * @param capacity INT capacidade em inteiro do recinto
     * @param animals Array[Animals] vetor com objetos de animais, caso houver algum animal
     * @return this; - Retorna o próprio objeto da classe RecintosZoo
    */
    addTestAnimalArea(id, biomes, capacity, animals) {
        const newAnimalArea = new AnimalArea(id, biomes, capacity, animals);
        this.#animalAreas.push(newAnimalArea);
        return this;
    }
}

export { RecintosZoo as RecintosZoo };
