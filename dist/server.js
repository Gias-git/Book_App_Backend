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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const PORT = 7000;
dotenv_1.default.config();
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.vv2sz9v.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGO_URI);
            console.log("Mongoose Connected");
            app_1.default.listen(PORT, () => {
                console.log(`APP is Listening in port ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
