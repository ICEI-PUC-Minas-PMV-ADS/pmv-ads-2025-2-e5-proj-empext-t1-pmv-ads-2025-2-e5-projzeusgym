import React from 'react';
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
// CORREÇÃO: Caminho correto para a pasta styles na raiz de src/
import '../styles/LayoutBase.css'; 

/**
 * Layout Padrão para Páginas de Administração.
 * Inclui o Header e o Footer.
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - O conteúdo da página a ser renderizado.
 */
const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout-wrapper">
            <HeaderAdmin /> 

            <main className="main-page-content">
                {children} 
            </main>
            
            <FooterAdmin />
        </div>
    );
};

export default AdminLayout;