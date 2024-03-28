"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var seed_1 = require("./seed");
var faker_1 = require("@faker-js/faker");
var prisma = new client_1.PrismaClient();
/**
 * Formata numero de telefone gerado pelo faker, tira o +55.
 * @returns {string} retorna string representando numero formatado
 */
function generatePhone() {
    var phone = faker_1.fakerPT_BR.phone.number();
    if (phone.startsWith('+55 '))
        return phone.replace('+55 ', '');
    return phone;
}
/**
 * Semeia a tabela funcionarios.
 * @param {Funcionario[]} funcionarios vetor com os funcionarios a serem inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
function seedFuncionarios(funcionarios) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, funcionarios_1, f, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, funcionarios_1 = funcionarios;
                    _a.label = 1;
                case 1:
                    if (!(_i < funcionarios_1.length)) return [3 /*break*/, 6];
                    f = funcionarios_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma.funcionario.create({
                            data: {
                                detalhespessoa: {
                                    create: {
                                        nascimento_pessoa: f.detalhes.nascimento,
                                        nome_pessoa: f.detalhes.nome,
                                        phone_pessoa: generatePhone()
                                    }
                                },
                                usuario_func: f.usuario,
                                senha_func: f.senha,
                                salario_func: f.salario,
                            }
                        })];
                case 3:
                    _a.sent();
                    console.log('Funcionario criado com sucesso');
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log('Erro ao criar funcionario', error_1);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Semeia a tabela de clientes.
 * @param {number} quantidade a quantidade de cliente a serem geradas e inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
function seedClientes(quantidade) {
    return __awaiter(this, void 0, void 0, function () {
        var i, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < quantidade)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma.cliente.create({
                            data: {
                                detalhespessoa: {
                                    create: {
                                        nome_pessoa: faker_1.fakerPT_BR.person.fullName(),
                                        phone_pessoa: generatePhone(),
                                        nascimento_pessoa: faker_1.fakerPT_BR.date.between({
                                            from: new Date('1950-01-01'),
                                            to: Date.now()
                                        })
                                    }
                                }
                            }
                        })];
                case 3:
                    _a.sent();
                    console.error("Cliente criado com sucesso");
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Erro ao criar Cliente:", error_2);
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Semeia a tabela de carros.
 * @param {Carro[]} carros vetor com os carros a serem inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
function seedCarros(carros) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, carros_1, c, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, carros_1 = carros;
                    _a.label = 1;
                case 1:
                    if (!(_i < carros_1.length)) return [3 /*break*/, 6];
                    c = carros_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma.carro.create({
                            data: {
                                modelo: c.modelo,
                                preco_carro: c.preco,
                                ano_fab: faker_1.fakerPT_BR.number.int({ min: 2000, max: 2024 }),
                                quilometragem: faker_1.fakerPT_BR.number.int({ min: 0, max: 1000000 })
                            }
                        })];
                case 3:
                    _a.sent();
                    console.log('Carro criado com sucesso');
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.log('Erro ao criar carro', error_3);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Semeia a tabela de cores.
 * @param {number} quantidade quantidade de cores geradas e inseridas
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
function seedCores(quantidade) {
    return __awaiter(this, void 0, void 0, function () {
        var colors, i, color, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    colors = [];
                    for (i = 0; i < quantidade; i++) {
                        color = {
                            nome_cor: '',
                            preco_cor: 0.0
                        };
                        color.nome_cor = faker_1.fakerPT_BR.color.human();
                        if (!colors.includes(color)) {
                            color.preco_cor = faker_1.fakerPT_BR.number.float({ min: 0, max: 1000 });
                            colors.push(color);
                        }
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.cor.createMany({
                            data: colors
                        })];
                case 2:
                    _a.sent();
                    console.log('Cores criadas com sucesso');
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.log('Erro ao criar cor:', error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Semeia a tabela de versoes.
 * @param {Version[]} versions vetor com as versoes a serem inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
function seedVersoes(versions) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, versions_1, v, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, versions_1 = versions;
                    _a.label = 1;
                case 1:
                    if (!(_i < versions_1.length)) return [3 /*break*/, 6];
                    v = versions_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma.versao.create({
                            data: {
                                nome_versao: v.nome,
                                preco_versao: v.preco
                            }
                        })];
                case 3:
                    _a.sent();
                    console.log('Versao criada com sucesso');
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.log('Erro ao criar versao', error_5);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Semeia a tabela de motores.
 * @param {Motor[]} motores vetor com os motores a serem inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
function seedMotores(motores) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, motores_1, m, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, motores_1 = motores;
                    _a.label = 1;
                case 1:
                    if (!(_i < motores_1.length)) return [3 /*break*/, 6];
                    m = motores_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma.motor.create({
                            data: {
                                cilindrada: m.cilindrada,
                                combustivel: m.combustivel,
                                potencia: m.potencia
                            }
                        })];
                case 3:
                    _a.sent();
                    console.log('Motor criado com sucesso');
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _a.sent();
                    console.log('Erro ao criar motor', error_6);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Semeia a tabela de estoque.
 * @param {number} quantidade quantidade de estoques a serem inseridas
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
function seedEstoque(quantidade) {
    return __awaiter(this, void 0, void 0, function () {
        var qntd, i, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    qntd = quantidade ? quantidade : 1;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < qntd)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma.estoque.create({ data: { quantidade_veiculo: 0 } })];
                case 3:
                    _a.sent();
                    console.log('Estoque criado com sucesso');
                    return [3 /*break*/, 5];
                case 4:
                    error_7 = _a.sent();
                    console.log('Erro ao criar estoque:', error_7);
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Semeia a tabela de vendas.
 * @param {number} quantidade quantidade de vendas a serem inseridas
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
function seedVendas(quantidade) {
    return __awaiter(this, void 0, void 0, function () {
        var qntd, i, min, maxCar, maxCliente, maxFunc, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    qntd = quantidade ? quantidade : 0;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < qntd)) return [3 /*break*/, 9];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    min = 1;
                    return [4 /*yield*/, prisma.carro.count()];
                case 3:
                    maxCar = _a.sent();
                    return [4 /*yield*/, prisma.cliente.count()];
                case 4:
                    maxCliente = _a.sent();
                    return [4 /*yield*/, prisma.funcionario.count()];
                case 5:
                    maxFunc = _a.sent();
                    return [4 /*yield*/, prisma.venda.create({
                            data: {
                                id_carro_fk: Math.floor(Math.random() * (maxCar - min + 1)) + min,
                                id_cliente_fk: Math.floor(Math.random() * (maxCliente - min + 1)) + min,
                                id_funcionario_fk: Math.floor(Math.random() * (maxFunc - min + 1)) + min,
                                data_venda: faker_1.fakerPT_BR.date.between({
                                    from: new Date('2020-01-01'),
                                    to: Date.now()
                                })
                            }
                        })];
                case 6:
                    _a.sent();
                    console.log('Venda criada com sucesso');
                    return [3 /*break*/, 8];
                case 7:
                    error_8 = _a.sent();
                    console.log('Erro ao criar venda:', error_8);
                    return [3 /*break*/, 8];
                case 8:
                    i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var quantidadeClientes, quantidadeCores, quantidadeVendas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    quantidadeClientes = 10;
                    quantidadeCores = 5;
                    quantidadeVendas = 5;
                    return [4 /*yield*/, seedEstoque()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, seedVersoes(seed_1.versoes)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, seedFuncionarios(seed_1.funcionarios)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, seedClientes(quantidadeClientes)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, seedMotores(seed_1.motores)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, seedCarros(seed_1.carros)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, seedCores(quantidadeCores)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, seedVendas(quantidadeVendas)];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
