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
        if(animalObject.erro){
            return animalObject;
        }

        // (ForEach) Verifica se o animal selecionado é aceito em algum bioma e insere no array "Poss";
        var possibleHabitats = [];
        this.#animalAreas.forEach((animalArea) => {
            if (animalArea.biome.some(biome => animalObject.biome.includes(biome))){
                var avaibleSpace = animalArea.verifyAvaibleSpace();
                const expectedUsage = animalObject.size * quantidade;

                avaibleSpace = avaibleSpace - expectedUsage;
                
                if (avaibleSpace >= 0){
                    // Loop de repetição para adicionar a quantidade de animais informada no Array de Habitat compativel;
                    for (var i = 0; i < quantidade; i++){
                        animalArea.occupantAnimals.push(animalObject);
                    }
                    possibleHabitats.push(animalArea);
                }
            }
        });
        animalObject.recintosViaveis = possibleHabitats.map((habitatInfo => habitatInfo.info()));
        console.log(animalObject.recintosViaveis);
    }

    // Métodos auxiliares
    validateAnimal(specie){
        const animalExists = this.#speciesList.find(animal => animal.species === String(specie).toUpperCase());
        if (animalExists){
            return animalExists;
        } 
        else{
            return { erro: "Animal inválido", recintosViaveis: null };    
        }
    }
}

new RecintosZoo().analisaRecintos("Leao", 2);

export { RecintosZoo as RecintosZoo };
