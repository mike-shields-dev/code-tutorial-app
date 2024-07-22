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
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: process.env.ENV_FILE || '.env.test' });
const PORT = process.env.EXPRESS_PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/api/tutorials", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Example placeholder response
    res.json("tutorials");
}));
exports.default = app;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log("Express is running on port " + PORT);
    });
}
