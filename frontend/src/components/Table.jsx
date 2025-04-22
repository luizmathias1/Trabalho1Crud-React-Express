const Table = ({ headers, data, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-gray-100">
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 border-b text-left">
                                {header}
                            </th>
                        ))}
                        <th className="px-6 py-3 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.user_id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 border-b">{user.user_id}</td>
                            <td className="px-6 py-4 border-b">{user.user_name}</td>
                            <td className="px-6 py-4 border-b">{user.user_age}</td>
                            <td className="px-6 py-4 border-b">{user.user_cpf}</td>
                            <td className="px-6 py-4 border-b">
                                <button 
                                    onClick={() => onEdit(user.user_id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 hover:cursor-pointer"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => onDelete(user.user_id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;