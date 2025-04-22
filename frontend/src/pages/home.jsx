import { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../services/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Erro ao deletar:', error);
        }
    };

    const handleEdit = (id) => {
        const user = users.find(u => u.user_id === id);
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Validações básicas antes de enviar
            if (!editingUser?.user_name || !editingUser?.user_age || !editingUser?.user_cpf) {
                throw new Error('Por favor, preencha todos os campos obrigatórios');
            }

            const response = await updateUser(editingUser.user_id, editingUser);
            
            if (response.success) {
                setIsModalOpen(false);
                fetchUsers();
            } else {
                throw new Error('Erro ao atualizar usuário');
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    const headers = ['ID', 'Nome', 'Idade'];

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Lista de Usuários</h1>
                <button
                    onClick={() => navigate('/create')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Novo Usuário
                </button>
            </div>
            <Table 
                headers={headers}
                data={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="Editar Usuário"
            >
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nome
                        </label>
                        <input
                            type="text"
                            value={editingUser?.user_name || ''}
                            onChange={(e) => setEditingUser({
                                ...editingUser,
                                user_name: e.target.value
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Idade
                        </label>
                        <input
                            type="number"
                            value={editingUser?.user_age || ''}
                            onChange={(e) => setEditingUser({
                                ...editingUser,
                                user_age: e.target.value
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            CPF
                        </label>
                        <input
                            type="text"
                            value={editingUser?.user_cpf || ''}
                            onChange={(e) => setEditingUser({
                                ...editingUser,
                                user_cpf: e.target.value
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={editingUser?.user_password || ''}
                            onChange={(e) => setEditingUser({
                                ...editingUser,
                                user_password: e.target.value
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Home;