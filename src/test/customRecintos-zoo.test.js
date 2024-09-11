import { RecintosZoo } from "../recintos-zoo.js";
import { Animal } from "../entities/animal.js"; 


describe('Recintos do Zoologico - Testes adicionais', () => {

    test('Deve encontrar recinto para 1 hipopotamo', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis).toContain('Recinto 4 (espaço livre: 4 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Não deve encontrar recinto para 1 leão em recintos não isolados', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEAO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 3 total: 9)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve rejeitar parâmetro de espécie não string', () => {
        const resultado = new RecintosZoo().analisaRecintos(12, 3);
        expect(resultado.erro).toBe("A espécie fornecida deve ser uma String");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar parâmetro de quantidade não numérico', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEAO', 'três');
        expect(resultado.erro).toBe("A quantidade fornecida deve ser um Número");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recinto para 3 leopardos', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEOPARDO', 3);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });    

    test('Deve encontrar recinto para 2 hipopotamos', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 4 (espaço livre: 0 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recinto para 1 gazela', () => {
        const resultado = new RecintosZoo().analisaRecintos('GAZELA', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 4 total: 10)');
        expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 3 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar recinto para 1 macaco', () => {
        const resultado = new RecintosZoo().analisaRecintos('macaco', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 6 total: 10)');
        expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 3 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('[Inserção de RECINTO TESTE] Deve encontrar recintos para 1 leão', () => {
        const gazela = new Animal("GAZELA", 2, ["savana"]);
        const resultado = new RecintosZoo().addTestAnimalArea(6, ["savana"], 10, [gazela]).analisaRecintos("leao", 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 3 total: 9)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

});
