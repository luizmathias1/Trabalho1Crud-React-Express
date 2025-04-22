const url = 'http://localhost:8080'

export const getUsers = async () => {
    try {
        const response = await fetch(`${url}/users`);
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${url}/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar usuário');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
};

export const updateUser = async (id, newUserData) => {
    try {
        const response = await fetch(`${url}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: newUserData.user_name,
                user_age: parseInt(newUserData.user_age),
                user_cpf: newUserData.user_cpf,
                user_password: newUserData.user_password
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Resposta do servidor:', errorData);
            throw new Error('Erro ao atualizar usuário');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return { success: false, error: error.message };
    }
};

export const createUser = async (userData) => {
    try {
        // Validação inicial
        if (!userData.user_name || !userData.user_age || !userData.user_cpf || !userData.user_password) {
            throw new Error('Todos os campos são obrigatórios');
        }

        // Dados a serem enviados
        const userDataToSend = {
            user_name: userData.user_name,
            user_age: parseInt(userData.user_age),
            user_cpf: userData.user_cpf,
            password: userData.user_password  // Alterado para 'password' para corresponder ao backend
        };

        // Log dos dados antes do envio
        console.log('Dados a serem enviados:', userDataToSend);

        // Requisição fetch
        const response = await fetch(`${url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userDataToSend)
        });

        // Primeiro, verifica o status da resposta
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta:', response.status, errorText);
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Tenta fazer o parse da resposta como JSON
        const data = await response.json();
        console.log('Resposta do servidor:', data);

        // Verifica erros específicos do SQL
        if (data.code) {
            console.error('Erro SQL:', data);
            throw new Error(data.sqlMessage || 'Erro ao criar usuário');
        }

        // Retorna sucesso
        return {
            success: true,
            data: data
        };

    } catch (error) {
        console.error('Erro completo:', error);
        return {
            success: false,
            error: error.message
        };
    }
};