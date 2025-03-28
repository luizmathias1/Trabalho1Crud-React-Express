import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);

  // Função para buscar usuários
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Chama a função ao carregar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;