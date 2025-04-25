import { useState } from 'react';

const Table = ({ headers, data, onEdit, onDelete }) => {
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (userId) => {
        setExpandedRow(expandedRow === userId ? null : userId);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 border-b text-left">ID</th>
                        <th className="px-6 py-3 border-b text-left">Nome</th>
                        <th className="px-6 py-3 border-b text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <>
                            <tr 
                                key={user.user_id} 
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => toggleRow(user.user_id)}
                            >
                                <td className="px-6 py-4 border-b">{user.user_id}</td>
                                <td className="px-6 py-4 border-b">{user.user_name}</td>
                                <td className="px-6 py-4 border-b">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(user.user_id);
                                        }}
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(user.user_id);
                                        }}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="border-b">
                                    <div 
                                        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                                            expandedRow === user.user_id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-4 bg-gray-50">
                                                <div className="space-y-2">
                                                    <p><span className="font-semibold">Idade:</span> {user.user_age}</p>
                                                    <p><span className="font-semibold">CPF:</span> {user.user_cpf}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;