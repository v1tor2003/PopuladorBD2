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
var prisma = new client_1.PrismaClient();
/**
 * Relaciona carros existentes com cores existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
function CarroCor() {
    return __awaiter(this, void 0, void 0, function () {
        var min, max, carAmount, i, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    min = 1;
                    return [4 /*yield*/, prisma.cor.count()];
                case 1:
                    max = _a.sent();
                    return [4 /*yield*/, prisma.carro.count()];
                case 2:
                    carAmount = _a.sent();
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i <= carAmount)) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.carro.update({
                            where: {
                                id_carro: i,
                                id_cor_fk: null
                            },
                            data: {
                                id_cor_fk: Math.floor(Math.random() * (max - min + 1)) + min
                            }
                        })];
                case 4:
                    _a.sent();
                    console.log('Carro e cor relacionados com sucesso');
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.log('Erro ao relacionar carro com cor', error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
/**
 * Relaciona carros existentes com versoes existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
function CarroVersao() {
    return __awaiter(this, void 0, void 0, function () {
        var min, max, carAmount, i, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    min = 1;
                    return [4 /*yield*/, prisma.versao.count()];
                case 1:
                    max = _a.sent();
                    return [4 /*yield*/, prisma.carro.count()];
                case 2:
                    carAmount = _a.sent();
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i <= carAmount)) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.carro.update({
                            where: {
                                id_carro: i,
                                id_versao_fk: null
                            },
                            data: {
                                id_versao_fk: Math.floor(Math.random() * (max - min + 1)) + min
                            }
                        })];
                case 4:
                    _a.sent();
                    console.log('Carro e versao relacionados com sucesso');
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    console.log('Erro ao relacionar carro com versao', error_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
/**
 * Relaciona carros existentes com motores existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
function CarroMotor() {
    return __awaiter(this, void 0, void 0, function () {
        var min, max, carAmount, i, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    min = 1;
                    return [4 /*yield*/, prisma.motor.count()];
                case 1:
                    max = _a.sent();
                    return [4 /*yield*/, prisma.carro.count()];
                case 2:
                    carAmount = _a.sent();
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i <= carAmount)) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.carro.update({
                            where: {
                                id_carro: i
                            },
                            data: {
                                id_motor_fk: Math.floor(Math.random() * (max - min + 1)) + min
                            }
                        })];
                case 4:
                    _a.sent();
                    console.log('Carro e motor relacionados com sucesso');
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    console.log('Erro ao relacionar carros com motores', error_3);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
/**
 * Relaciona carros existentes com estoques existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
function CarroEstoque() {
    return __awaiter(this, void 0, void 0, function () {
        var min, max, carAmount, i, res, e, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    min = 1;
                    return [4 /*yield*/, prisma.estoque.count()];
                case 1:
                    max = _a.sent();
                    return [4 /*yield*/, prisma.carro.count()];
                case 2:
                    carAmount = _a.sent();
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i <= carAmount)) return [3 /*break*/, 8];
                    return [4 /*yield*/, prisma.carro.update({
                            where: {
                                id_carro: i
                            },
                            data: {
                                id_estoque_fk: Math.floor(Math.random() * (max - min + 1)) + min
                            }
                        })];
                case 4:
                    res = _a.sent();
                    if (!res) return [3 /*break*/, 7];
                    return [4 /*yield*/, prisma.estoque.findUnique({
                            where: {
                                id_estoque: res.id_estoque_fk
                            }
                        })];
                case 5:
                    e = _a.sent();
                    return [4 /*yield*/, prisma.estoque.update({
                            where: {
                                id_estoque: res.id_estoque_fk
                            },
                            data: {
                                quantidade_veiculo: (e === null || e === void 0 ? void 0 : e.quantidade_veiculo) + 1
                            }
                        })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 3];
                case 8:
                    console.log('Carro relacionado a estoque com sucesso');
                    return [3 /*break*/, 10];
                case 9:
                    error_4 = _a.sent();
                    console.log('Erro ao relacionar carro com estoque', error_4);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
/**
 * Relaciona carros existentes com clientes existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
function CarroCliente() {
    return __awaiter(this, void 0, void 0, function () {
        var min, max, customerAmount, i, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    min = 1;
                    return [4 /*yield*/, prisma.carro.count()];
                case 1:
                    max = _a.sent();
                    return [4 /*yield*/, prisma.cliente.count()];
                case 2:
                    customerAmount = _a.sent();
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i <= customerAmount)) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.carro_cliente.create({
                            data: {
                                id_carro: Math.floor(Math.random() * (max - min + 1)) + min,
                                id_cliente: i
                            }
                        })];
                case 4:
                    _a.sent();
                    console.log('Carro relacionado a cliente com sucesso');
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_5 = _a.sent();
                    console.log('Erro ao relacionar carro com cliente', error_5);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, CarroCor()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, CarroVersao()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, CarroMotor()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, CarroEstoque()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, CarroCliente()];
                case 5:
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
