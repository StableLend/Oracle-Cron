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
        while (_) try {
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
exports.__esModule = true;
var taquito_1 = require("@taquito/taquito");
var signer_1 = require("@taquito/signer");
var axios = require('axios');
var tezos = new taquito_1.TezosToolkit('https://delphinet.smartpy.io');
tezos.setProvider({ signer: new signer_1.InMemorySigner('edskRf6hntyzJaC4Kv4ywGgPRVV2M12ubX5GkN8NxrmpXzuqBRmeppq3WhUtepahhnRRAeMQ1H44psNLmAC2M58R1A8WG5A4eD') });
var ApiEndpoints = [
    'https://api.coinbase.com/v2/prices/XTZ-USD/sell',
    'https://api.coinbase.com/v2/prices/XTZ-EUR/sell',
    'https://api.coinbase.com/v2/prices/XTZ-GBP/sell',
    'https://api.coinbase.com/v2/prices/XTZ-JPY/sell',
];
var SmartContract = [
    'KT1J9gYtCMeYCJxL63DUmB5ETyXQMaXFWD4B',
    'KT1Tj1zeVtXSQveYtY1sVEEomiymLadZi11k',
    'KT1TQiQCVxXicS38iQu7TBvFLcKhAewAstPY',
    'KT1WpZxUuLNxPJEy7V7fgfTSSbroucDxuW6s'
];
function UpdateOracle(endpoint, address) {
    return __awaiter(this, void 0, void 0, function () {
        var response, amount, contract, operation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get(endpoint)];
                case 1:
                    response = _a.sent();
                    amount = Math.floor(response.data.data.amount * 100);
                    console.log(amount);
                    return [4 /*yield*/, tezos.contract.at(address)];
                case 2:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.methods.feedData(amount).send()];
                case 3:
                    operation = _a.sent();
                    return [4 /*yield*/, operation.confirmation()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var index = 3;
UpdateOracle(ApiEndpoints[index], SmartContract[index]);
