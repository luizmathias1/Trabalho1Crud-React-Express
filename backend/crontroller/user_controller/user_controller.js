import { db } from '../../model/db.js';

// GET ALL USER
export const getUser = (_, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

// ADD NEW USER
export const postUser = (req, res) => {
  const { user_name, user_age, user_cpf } = req.body;

  // Validação de campos do usuario
  if (!user_name || !user_age || !user_cpf) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios: user_name, user_age, user_cpf" });
  }

  const q = "INSERT INTO user (user_name, user_age, user_cpf) VALUES (?, ?, ?)";
  db.query(q, [user_name, user_age, user_cpf], (err, data) => {
    if (err) return res.json(err);
    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  });
};

// Vamos ver remover o user usando o id dele na requisiçãao localhost:8080/user/id
export const deleteUser = (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM user WHERE user_id = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ message: "Usuário deletado com sucesso!" });
  });
};

// PUT: Atualiza um usuário pelo ID
export const updateUser = (req, res) => {
  const user_id = req.params.id;
  const updates = Object.entries(req.body); 

  if (updates.length === 0) {
    return res.status(400).json({ error: "Nenhum campo para atualizar foi enviado." });
  }

  const setClause = updates.map(([key]) => `${key} = ?`).join(", ");
  const values = updates.map(([, value]) => value);
  const q = `UPDATE user SET ${setClause} WHERE user_id = ?`;

  values.push(user_id);

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  });
};