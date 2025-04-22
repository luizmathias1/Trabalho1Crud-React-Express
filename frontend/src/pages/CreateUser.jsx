import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';

const CreateUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        user_name: '',
        user_age: '',
        user_cpf: '',
        user_password: ''
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Iniciando criação de usuário...'); // Log de início
            
            const response = await createUser(user);
            console.log('Resposta da API:', response); // Log da resposta

            if (response.success) {
                console.log('Usuário criado com sucesso!');
                navigate('/');
            } else {
                setError(response.error || 'Erro ao criar usuário');
            }
        } catch (error) {
            console.error('Erro no handleSubmit:', error);
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4 justify-center items-center flex flex-col h-screen">
            <h1 className="text-2xl font-bold mb-4">Criar Novo Usuário</h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <input
                        placeholder='Nome'
                        type="text"
                        value={user.user_name}
                        onChange={(e) => setUser({...user, user_name: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <input
                        placeholder='Idade'
                        type="number"
                        value={user.user_age}
                        onChange={(e) => setUser({...user, user_age: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <input
                        placeholder='CPF (apenas números)'
                        type="text"
                        value={user.user_cpf}
                        onChange={(e) => setUser({...user, user_cpf: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        placeholder='Senha'
                        type="password"
                        value={user.user_password}
                        onChange={(e) => setUser({...user, user_password: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:cursor-pointer"
                    >
                        Criar Usuário
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:cursor-pointer"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;