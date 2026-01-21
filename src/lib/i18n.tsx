'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'zh';

type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

const translations: Translations = {
    en: {
        dashboard: 'Dashboard',
        welcomeBack: 'Welcome back',
        addOpportunity: 'Add Opportunity',
        logout: 'Logout',
        yourOpportunities: 'Your Opportunities',
        noOpportunities: 'No opportunities found. Start by creating your first opportunity!',
        loading: 'Loading...',
        code: 'Code',
        name: 'Name',
        status: 'Status',
        customer: 'Customer',
        owner: 'Owner',
        amount: 'Amount',
        supportPeriod: 'Support Period',
        travelInfo: 'Travel Info',
        active: 'Active',
        newOpportunity: 'New Opportunity',
        addDescription: 'Add a new opportunity to your pipeline',
        opportunityCode: 'Opportunity Code',
        opportunityName: 'Opportunity Name',
        customerInfo: 'Customer Info',
        preSalesOwner: 'Pre-sales Owner',
        supportStartDate: 'Support Start Date',
        supportEndDate: 'Support End Date',
        needTravel: 'Travel Required',
        travelDays: 'Travel Days',
        travelDestination: 'Travel Destination',
        createOpportunity: 'Create Opportunity',
        delete: 'Delete',
        deleting: 'Deleting...',
        cancel: 'Cancel',
        areYouSure: 'Are you sure?',
        deleteDescription: 'This action cannot be undone. This will permanently delete the opportunity',
        success: 'Success',
        deleteSuccess: 'Opportunity deleted successfully!',
        createSuccess: 'Opportunity created successfully!',
        error: 'Error',
        travelYes: 'Yes',
        travelNo: 'No',
    },
    zh: {
        dashboard: '仪表盘',
        welcomeBack: '欢迎回来',
        addOpportunity: '添加商机',
        logout: '登出',
        yourOpportunities: '您的商机',
        noOpportunities: '未找到商机。开始创建您的第一个商机！',
        loading: '加载中...',
        code: '编号',
        name: '名称',
        status: '状态',
        customer: '客户',
        owner: '负责人',
        amount: '金额',
        supportPeriod: '支持周期',
        travelInfo: '差旅信息',
        active: '进行中',
        newOpportunity: '新商机',
        addDescription: '添加到您的销售管道',
        opportunityCode: '商机编号',
        opportunityName: '商机名称',
        customerInfo: '客户信息',
        preSalesOwner: '售前负责人',
        supportStartDate: '支持开始日期',
        supportEndDate: '支持结束日期',
        needTravel: '需要出差',
        travelDays: '出差天数',
        travelDestination: '出差地点',
        createOpportunity: '创建商机',
        delete: '删除',
        deleting: '删除中...',
        cancel: '取消',
        areYouSure: '您确定吗？',
        deleteDescription: '此操作无法撤销。这将永久删除商机',
        success: '成功',
        deleteSuccess: '商机删除成功！',
        createSuccess: '商机创建成功！',
        error: '错误',
        travelYes: '是',
        travelNo: '否',
    }
};

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
