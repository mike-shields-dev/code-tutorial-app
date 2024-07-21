"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prismaClient_1 = __importDefault(require("./prisma/prismaClient"));
const PORT = process.env.EXPRESS_PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/tutorials', async (req, res) => {
    const tutorials = await prismaClient_1.default.tutorial.findMany();
    res.json(tutorials);
});
app.listen(PORT, () => {
    // console.log("NODE_ENV=" + process.env.NODE_ENV);
    console.log('Server is running on port ' + PORT);
});
