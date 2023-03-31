import autores from "../models/Autor.js";

class AutorController {
    static listarAutores = (req, res) => {
        autores.find()
      .then((autores) => {
        res.status(200).json(autores);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar autores' });
      })
    }

    static listarAutoresPorId = async (req, res) => {
        const id = req.params.id;
        try {
          const Autor = await autores.findById(id);
          if (Autor) {
            res.status(200).send(Autor);
          } else {
            res.status(400).send({ message: `Id do Autor não localizado.` });
          }
        } catch (err) {
          res.status(400).send({ message: `${err.message} - Id do Autor inválido.` });
        }
      }
      

    static cadastrarAutor = (req, res) => {
        let autor = new autores(req.body);

        autor.save()
             .then((autorsalvo) => {
                 res.status(201).send(autorsalvo.toJSON());
  })
                .catch((err) => {
                 res.status(500).send({ message: `${err.message} - Falha ao cadastrar o Autor.` });
  })}

    static atualizarAutor = (req, res) => {
        const id = req.params.id;
        
        autores.findByIdAndUpdate(id, {$set: req.body},)
      .then((autores) => {
        res.status(200).send({message: 'O Autor foi atualizado com sucesso'});
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ meessage:err.message});
      })


    }
    
    static excluirAutor = async (req, res) => {
        const id = req.params.id;
        try {
          const AutorRemovido = await autores.findByIdAndDelete(id);
          if (AutorRemovido) {
            res.status(200).send({ message: 'O Autor foi removido com sucesso' });
          } else {
            res.status(404).send({ message: 'Autor não encontrado' });
          }
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }
      

    
}

export default AutorController;