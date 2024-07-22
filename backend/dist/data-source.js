"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the specified file
const envFile = path_1.default.resolve(__dirname, "../../.env.development");
dotenv_1.default.config({ path: envFile });
const { POSTGRES_URL } = process.env;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: POSTGRES_URL, // Use the URL directly from the .env file
    synchronize: true,
    logging: false,
    entities: [entities_1.Tutorial, entities_1.Lesson],
});
