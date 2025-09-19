'use client';

import { useState } from 'react';
import { languages, languageNames, languageFlags, type Language } from '@/app/i18n/config';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-standard-secondary text-white rounded-lg hover:opacity-90 transition-opacity border border-standard-orange"
      >
        <Globe size={20} />
        <span className="text-lg">{languageFlags[currentLang]}</span>
        <span className="hidden sm:inline">{languageNames[currentLang]}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border-2 border-standard-orange z-50 min-w-[200px]">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onLanguageChange(lang);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                lang === currentLang ? 'bg-gray-100 font-semibold' : ''
              } ${lang === languages[0] ? 'rounded-t-lg' : ''} ${
                lang === languages[languages.length - 1] ? 'rounded-b-lg' : ''
              }`}
            >
              <span className="text-xl">{languageFlags[lang]}</span>
              <span>{languageNames[lang]}</span>
              {lang === currentLang && (
                <span className="ml-auto text-standard-orange">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}