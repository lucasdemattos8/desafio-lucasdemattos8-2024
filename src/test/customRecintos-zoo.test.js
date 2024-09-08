import { RecintosZoo } from "../recintos-zoo.js";

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

});
