import express from "express";
import livroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .get("/livros", livroController.listarLivros )
    .get("/livros/busca", livroController.listarLivroPorEditora)
    .get("/livros/:id", livroController.listarLivrosPorId)
    .post("/livros", livroController.cadastrarLivro)
    .put("/Livros/:id", livroController.atualizarLivro)
    .delete("/Livros/:id", livroController.excluirLivro)
export default router;