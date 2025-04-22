import { db } from '../../model/db.js';

// GET ALL USER
export const getUser = (_, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
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

// CREATE NEW USER WITH PASSWORD
export const createUser = (req, res) => {
    console.log('Corpo da requisição recebido:', req.body);

    const { user_name, user_age, user_cpf, password } = req.body;  // Changed from user_password to password

    // Log individual fields for debugging
    console.log('Campos extraídos:', {
        user_name: user_name || 'não presente',
        user_age: user_age || 'não presente',
        user_cpf: user_cpf || 'não presente',
        password: password ? 'presente' : 'não presente'  // Changed from user_password to password
    });

    // Validate required fields with specific messages
    if (!user_name) return res.status(400).json({ error: "Nome é obrigatório" });
    if (!user_age) return res.status(400).json({ error: "Idade é obrigatória" });
    if (!user_cpf) return res.status(400).json({ error: "CPF é obrigatório" });
    if (!password) return res.status(400).json({ error: "Senha é obrigatória" });  // Changed from user_password to password

    const q = "INSERT INTO user (user_name, user_age, user_cpf, password) VALUES (?, ?, ?, ?)";
    
    db.query(q, [user_name, user_age, user_cpf, password], (err, data) => {  // Changed from user_password to password
        if (err) {
            console.error("Erro SQL:", err);
            return res.status(500).json({
                error: "Erro ao criar usuário",
                details: err.message
            });
        }
        return res.status(201).json({
            message: "Usuário criado com sucesso!",
            userId: data.insertId
        });
    });
};