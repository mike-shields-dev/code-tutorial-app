"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const tutorialsRoute_1 = __importDefault(require("./routes/tutorialsRoute"));
const envFilename = `.env.${process.env.NODE_ENV}`;
const envFilePath = path_1.default.resolve(process.cwd(), envFilename);
dotenv_1.default.config({ path: envFilePath });
const PORT = process.env.EXPRESS_PORT || 5000;
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/tutorials", tutorialsRoute_1.default);
exports.default = app;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log("Express is running on port " + PORT);
    });
}
