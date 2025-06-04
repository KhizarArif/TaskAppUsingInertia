import React from 'react';
import AdminPanelLayout from './AdminPanelLayout';

export default function useAdminLayout(PageComponent) {
    PageComponent.layout = page => <AdminPanelLayout children={page} />;
    return PageComponent;
}
