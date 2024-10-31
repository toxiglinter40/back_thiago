const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let tarefas = [];


app.post('/tarefas', (req, res) => {
    const novaTarefa = {
        id: tarefas.length + 1,
        descricao: req.body.descricao,
        concluida: false
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});


app.get('/tarefas/:id', (req, res) => {
    const tarefaId = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === tarefaId);
    if (!tarefa) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
});


app.put('/tarefas/:id', (req, res) => {
    const tarefaId = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === tarefaId);
    if (!tarefa) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
    tarefa.descricao = req.body.descricao || tarefa.descricao;
    tarefa.concluida = req.body.concluida !== undefined ? req.body.concluida : tarefa.concluida;
    res.json(tarefa);
});


app.delete('/tarefas/:id', (req, res) => {
    const tarefaId = parseInt(req.params.id);
    const tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);
    if (tarefaIndex === -1) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
    tarefas.splice(tarefaIndex, 1);
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});