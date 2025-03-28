import { db } from '../../model/db.js';

// GET: Retorna todos os usuários
export const getUser = (_, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

// POST: Adiciona um novo usuário
export const postUser = (req, res) => {
  const { name, email } = req.body;
  const q = "INSERT INTO user (user_name, user_age, user_cpf) VALUES (?, ?, ?)";
  db.query(q, [name, email], (err, data) => {
    if (err) return res.json(err);
    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  });
};

// DELETE: Remove um usuário pelo ID
export const deleteUser = (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM user WHERE id = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ message: "Usuário deletado com sucesso!" });
  });
};

// PUT: Atualiza um usuário pelo ID
export const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const q = "UPDATE user SET name = ?, email = ? WHERE id = ?";
  db.query(q, [name, email, userId], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  });
};