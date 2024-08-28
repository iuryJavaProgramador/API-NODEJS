"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use('/leituradeimagens', imageRoutes_1.default);
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Aplicação rodando em http://localhost:${PORT}/leituradeimagens`);
});
//# sourceMappingURL=index.js.map