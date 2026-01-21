'use client';

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Languages } from "lucide-react";

export function LanguageToggle() {
    const { language, setLanguage } = useI18n();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'zh' : 'en');
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleLanguage} title={language === 'en' ? "Switch to Chinese" : "切换到英文"}>
            <Languages className="h-4 w-4" />
            <span className="sr-only">Toggle Language</span>
            <span className="ml-2 text-xs font-semibold">{language === 'en' ? 'EN' : '中'}</span>
        </Button>
    );
}
