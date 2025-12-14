import React, { useState, useEffect } from 'react';
import { getAdminStatus } from '../services/api'; 
import { useUserContext } from '../hooks/useUserContext'; 

const AdminTestPage: React.FC = () => {
    const userContext = useUserContext();
    const [statusMessage, setStatusMessage] = useState('Aguardando teste de acesso ao Backend...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        testBackendAccess();
    }, []);

    const testBackendAccess = async () => {
        try {
            const message = await getAdminStatus();
            setStatusMessage(`SUCESSO (200 OK): ${message}`);
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                setStatusMessage('FALHA (403 Forbidden): O Backend BLOQUEOU o acesso. A autorização está FUNCIONANDO!');
            } else if (error.response && error.response.status === 401) {
                setStatusMessage('FALHA (401 Unauthorized): O Token é inválido ou expirou.');
            } else {
                setStatusMessage(`Erro inesperado ao conectar: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Teste de Rota de ADMIN (Backend)</h1>
            <p><strong>Usuário Logado:</strong> {userContext.email}</p>
            <p><strong>Role do Usuário:</strong> {userContext.role}</p>

            <div style={{ 
                marginTop: '15px', 
                padding: '10px', 
                border: '2px solid',
                borderColor: loading ? '#f7b036' : (statusMessage.includes('SUCESSO') ? '#28a745' : '#dc3545'),
                backgroundColor: loading ? '#fffbe6' : (statusMessage.includes('SUCESSO') ? '#d4edda' : '#f8d7da')
            }}>
                <p><strong>Resultado da Chamada:</strong></p>
                <p>{loading ? 'Testando...' : statusMessage}</p>
            </div>
        </div>
    );
};

export default AdminTestPage;