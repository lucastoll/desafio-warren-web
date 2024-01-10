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
import TransactionUseCases from './TransactionUseCases';
import { mockTransactions } from '../mocks/mockTransactions';
import nock from 'nock';
import { baseURL } from '../../config';
import { ApiTransactionGateway } from '../../gateways/transactions/TransactionGateway';
describe('TransactionUseCases', function () {
    var transactionUseCases;
    beforeEach(function () {
        transactionUseCases = new TransactionUseCases(new ApiTransactionGateway());
    });
    describe('get', function () {
        it('should return transactions when the response is ok', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock(baseURL).get('/transactions').reply(200, mockTransactions);
                        return [4 /*yield*/, transactionUseCases.get()];
                    case 1:
                        transactions = _a.sent();
                        expect(transactions).toEqual(mockTransactions);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error when the response is not ok', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nock(baseURL).get('/transactions').reply(400);
                        return [4 /*yield*/, expect(transactionUseCases.get()).rejects.toThrow('HTTP error! status: 400')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getById', function () {
        it('should return the transaction with the given id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = '5f89f9f257fe42957bf6dbfd';
                        nock(baseURL).get("/transactions/".concat(id)).reply(200, mockTransactions[0]);
                        return [4 /*yield*/, transactionUseCases.getById(id)];
                    case 1:
                        transaction = _a.sent();
                        expect(transaction).toEqual(mockTransactions[0]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('filterByStatus', function () {
        it('should return transactions with the given status', function () {
            var transactions = transactionUseCases.filterByStatus(mockTransactions, 'created');
            expect(transactions.length).toBe(2);
            expect(transactions[0].status).toBe('created');
            expect(transactions[1].status).toBe('created');
        });
        it('should throw an error when the status is invalid', function () {
            expect(function () {
                transactionUseCases.filterByStatus(mockTransactions, 'invalid');
            }).toThrowError('Status must be created, processing or processed');
        });
    });
    describe('filterByDate', function () {
        it('should return transactions sorted by date', function () {
            var transactions = transactionUseCases.filterByDate(mockTransactions);
            expect(transactions[0].date).toBe('2018-12-22');
            expect(transactions[1].date).toBe('2017-07-23');
            expect(transactions[2].date).toBe('2016-08-25');
        });
    });
    describe('search', function () {
        it('should return transactions that match the search term', function () {
            var transactions = transactionUseCases.search(mockTransactions, 'Resgate');
            expect(transactions.length).toBe(1);
            expect(transactions[0].title).toBe('Resgate');
        });
    });
});
//# sourceMappingURL=TransactionsUseCase.test.js.map