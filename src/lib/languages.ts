// Supported languages for the interface - Top 80 world languages
export interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
}

export const supportedLanguages: Language[] = [
    // Major Western European
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },

    // Asian Major
    { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
    { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭' },
    { code: 'my', name: 'Burmese', nativeName: 'မြန်မာစာ', flag: '🇲🇲' },
    { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭' },
    { code: 'lo', name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦' },
    { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵' },
    { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },

    // Middle East & North Africa
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
    { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî', flag: '🇮🇶' },

    // Eastern European & Slavic
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
    { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
    { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
    { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
    { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
    { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
    { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸' },
    { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
    { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮' },
    { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦' },
    { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰' },
    { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱' },
    { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹' },
    { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻' },
    { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪' },
    { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', flag: '🇧🇾' },

    // Nordic
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
    { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸' },

    // Other European
    { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🇪🇸' },
    { code: 'eu', name: 'Basque', nativeName: 'Euskara', flag: '🇪🇸' },
    { code: 'gl', name: 'Galician', nativeName: 'Galego', flag: '🇪🇸' },
    { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', flag: '🇮🇪' },
    { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', flag: '🇬🇧' },
    { code: 'mt', name: 'Maltese', nativeName: 'Malti', flag: '🇲🇹' },
    { code: 'lb', name: 'Luxembourgish', nativeName: 'Lëtzebuergesch', flag: '🇱🇺' },

    // African
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬' },
    { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦' },
    { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' },

    // Central Asian & Caucasus
    { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪' },
    { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', flag: '🇦🇲' },
    { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша', flag: '🇰🇿' },
    { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', flag: '🇺🇿' },
    { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', flag: '🇹🇯' },
    { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча', flag: '🇰🇬' },
    { code: 'tk', name: 'Turkmen', nativeName: 'Türkmen', flag: '🇹🇲' },
    { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳' },
];

export const defaultLanguage = 'en';

export const getLanguageByCode = (code: string): Language | undefined => {
    return supportedLanguages.find(lang => lang.code === code);
};

export const isRTL = (code: string): boolean => {
    return ['ar', 'he', 'fa', 'ur', 'ku'].includes(code);
};
