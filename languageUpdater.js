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
var axios_1 = require("axios");
var fs_1 = require("fs");
run();
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var awaitingTranslations, translations, _1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs_1.existsSync("./src/langs/"))
                        fs_1.mkdirSync("./src/langs/");
                    awaitingTranslations = true;
                    _a.label = 1;
                case 1:
                    if (!awaitingTranslations) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1["default"].post("https://api.premid.app/v3", {
                            query: "\n            {\n              langFiles(project:\"website\") {\n                lang\n                translations\n              }\n            }"
                        })];
                case 3:
                    translations = (_a.sent()).data.data.langFiles;
                    awaitingTranslations = false;
                    return [3 /*break*/, 5];
                case 4:
                    _1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 1];
                case 6:
                    translations.forEach(function (langTranslations) {
                        var keys = Object.keys(langTranslations.translations);
                        for (var i = 0; keys.length > i; i++) {
                            var translations_1 = langTranslations.translations[keys[i]];
                            delete langTranslations.translations[keys[i]];
                            langTranslations.translations[keys[i].replace(/_/g, ".")] = translations_1;
                        }
                        fs_1.writeFileSync("./src/langs/" + langTranslations.lang + ".json", JSON.stringify(langTranslations.translations));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
