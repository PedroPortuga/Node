import livros from "../models/Livro.js";

class livroController {
    static listarLivros = (req, res) => {
        livros.find()
        .populate('autor')
        .exec()
      .then((livros) => {
        res.status(200).json(livros);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar o livro' });
      })
    }

    static listarLivrosPorId = async (req, res) => {
        const id = req.params.id;
        try {
          const livro = await livros.findById(id)
          .populate('autor', 'nome')
          .exec()
          if (livro) {
            res.status(200).send(livro);
          } else {
            res.status(400).send({ message: `Id do Livro não localizado.` });
          }
        } catch (err) {
          res.status(400).send({ message: `${err.message} - Id do Livro inválido.` });
        }
      }
      

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);

        livro.save()
             .then((livroSalvo) => {
                 res.status(201).send(livroSalvo.toJSON());
  })
                .catch((err) => {
                 res.status(500).send({ message: `${err.message} - Falha ao cadastrar o livro.` });
  })}

    static atualizarLivro = (req, res) => {
        const id = req.params.id;
        
        livros.findByIdAndUpdate(id, {$set: req.body},)
      .then((livros) => {
        res.status(200).send({message: 'O livro foi atualizado com sucesso'});
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ meessage:err.message});
      })


    }
    
    static excluirLivro = async (req, res) => {
        const id = req.params.id;
        try {
          const livroRemovido = await livros.findByIdAndDelete(id);
          if (livroRemovido) {
            res.status(200).send({ message: 'O livro foi removido com sucesso' });
          } else {
            res.status(404).send({ message: 'Livro não encontrado' });
          }
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }

      static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora;
    
        livros.find({ editora: editora })
            .then((livros) => {
                res.status(200).send(livros);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: 'Erro ao buscar o livro' });
            });
    }
    
      

    
}

export default livroController;