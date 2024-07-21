"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: process.env.ENV_FILE || '.env.development' });
console.log("NODE_ENV=" + process.env.NODE_ENV);
const prismaClient = new client_1.PrismaClient({
    datasources: {
        db: {
            url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB}`
        }
    }
});
exports.default = prismaClient;
