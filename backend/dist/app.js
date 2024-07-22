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
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the specified file
const envFile = path_1.default.resolve(__dirname, process.env.ENV_FILE);
dotenv_1.default.config({ path: envFile });
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
