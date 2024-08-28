"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const yup = __importStar(require("yup"));
const uuid_1 = require("uuid");
const uploadSchema = yup.object().shape({
    image: yup.string().required("Image is required"),
    customer_code: yup.string().required("Customer code is required"),
    measure_datetime: yup.date().required("Measure datetime is required")
        .typeError("Measure datetime must be a valid date"),
    measure_type: yup.mixed()
        .oneOf(["WATER", "GAS"], "Invalid measure type")
        .required("Measure type is required"),
});
const router = (0, express_1.Router)();
router.post('/upload', async (req, res) => {
    try {
        // Validação dos dados do corpo da requisição
        await uploadSchema.validate(req.body, { abortEarly: false });
        // Extraindo os dados validados
        const body = req.body;
        // Aqui você deve implementar a lógica para processar a imagem e gerar os dados desejados
        const imageUrl = 'https://example.com/image.png'; // URL fictícia de exemplo
        const measureValue = 123; // Valor fictício de exemplo
        const measureUuid = (0, uuid_1.v4)(); // Gerando um UUID único para a medida
        // Resposta em caso de sucesso
        return res.status(200).json({
            image_url: imageUrl,
            measure_value: measureValue,
            measure_uuid: measureUuid
        });
    }
    catch (error) {
        // Tratamento de erro
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: error instanceof yup.ValidationError ? error.errors : "Error"
        });
    }
});
exports.default = router;
//# sourceMappingURL=imageRoutes.js.map