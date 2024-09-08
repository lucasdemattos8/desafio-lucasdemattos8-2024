import { AnimalArea } from "./entities/animalArea.js";
import { Animal } from "./entities/animal.js"; 


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
        // Verifica se o animal enviado pelo parametro é válido;
        const animalObject = this.validateAnimal(animal);

        // Verificar se obteve um erro na validação do objeto;
        if(animalObject.erro){
            return animalObject;
        }

        // Verifica se o valor obtido na quantidade é válido;
        if(quantidade <= 0){
            return {erro : "Quantidade inválida"};
        }


        // (ForEach) Verifica se o animal selecionado é compativel em algum bioma e insere no array "possibleHabitats";
        var possibleHabitats = [];
        this.#animalAreas.forEach((animalArea) => {
            if (animalArea.biome.some(biome => animalObject.biome.includes(biome))){
                var avaibleSpace = animalArea.verifyAvaibleSpace();
                const expectedUsage = animalObject.size * quantidade;

                avaibleSpace = avaibleSpace - expectedUsage;
                
                // Verificação para condições específicas dos animais;
                if (this.verifyAnimalConditionals(animalObject, animalArea, quantidade)){
                    // Verificação para condição de espaço necessário;
                    if (avaibleSpace >= 0){
                        animalArea = this.joinAnimalIntoTheArea(animalArea, animalObject, quantidade);
                        // Verificação para garantir o espaço necessário mesmo com bônus de espaço para especies diferentes;
                        if (animalArea.verifyAvaibleSpace() >= 0){
                            possibleHabitats.push(animalArea);
                        }
                    }
                }
            }
        });
        animalObject.recintosViaveis = possibleHabitats.map((habitatInfo => habitatInfo.info()));
        if (animalObject.recintosViaveis.length === 0){
            return { erro: "Não há recinto viável", recintosViaveis: null};
        }
        else{
            return animalObject;
        }
    }

    // Métodos auxiliares

    /**
     * Este método tem como objetivo validar e converter a STRING de nome passada no parametro para OBJETO dos animais listados
     * no construtor da classe "RecintosZoo", caso ele não encontre retorna um erro: "Animal inválido".
     * @param specie STRING de animal a ser validado/convertido;
     * @return retorna um Object(Animal) 
    */
    validateAnimal(specie){
        const animalExists = this.#speciesList.find(animal => animal.species === String(specie).toUpperCase());
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
    joinAnimalIntoTheArea(animalArea, animalObject, quantidade){
        for (var i = 0; i < quantidade; i++){
            animalArea.occupantAnimals.push(animalObject);
        }
        return animalArea;
    }

    /**
     * Este método tem como objetivo verificar as condições de cada individualidade dos animais, o retorno LÓGICO (bool)
     * da função tem como base o status da condição do objeto referido
     * @param animalObject Espécie de animal (objeto) a verificar as condições
     * @return boolean Retorna verdadeiro caso a individualidade do animal seja satisfeita, caso contrário falso.
    */
    verifyAnimalConditionals(animalObject, animalArea, quantidade){
        let carnivoreAnimals = ["LEAO", "LEOPARDO", "CROCODILO"];
        let animals = animalArea.occupantAnimals;
        let findCarnivoreAnimal = carnivoreAnimals.some(
            animalCarnivore => animalArea.occupantAnimals.find(animal => animal.species === animalCarnivore));

        switch (animalObject.species){
            case ("LEAO"):
            case ("LEOPARDO"):
            case ("CROCODILO"):
                // Verifica a ocorrencia de animais carnivoros DIFERENTES em seus recintos
                for(let i = 0; i < animals.length; i++){
                    if (animals[i] != animalObject){
                        return false;
                    }
                }
                return true;
            case ("MACACO"):
                // Verifica se há algum outro animal presente no recinto, e que ele seja obrigatoriamente pacifico;
                if(findCarnivoreAnimal){
                    return false;
                }
                // Verifica se ele não vai ser inserido com algum(ns) companheiro(s);
                if(quantidade >= 2){
                    return true;
                }
                // Verifica se NÃO há a presença de outros animais;
                if(animals.length === 0){
                    return false;
                }
                return true;
            case ("HIPOPOTAMO"):
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
                return false;
            default:
                // Caso encontre uma ocorrência de animal carnivoro em um recinto retorna false, ou seja, um recinto inválido para animais pacificos;
                if (findCarnivoreAnimal){
                    return false;
                }
                return true;
        }
    }
}

export { RecintosZoo as RecintosZoo };
