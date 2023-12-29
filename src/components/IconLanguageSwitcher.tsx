import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './ToggleLanguageSwitcher.module.css';

const ToggleLanguageSwitcher = () => {
  const router = useRouter();
  const [isEnglish, setEnglish] = useState(false);

  useEffect(() => {
    // Ensure that the language switcher detects the current language on initial load
    setEnglish(router.locale === 'en');
  }, [router.locale]);

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'ko' : 'en';

    router.push(router.pathname, router.asPath, { locale: newLanguage });
  };

  return (
    <div className={styles.toggleSwitch} onClick={toggleLanguage}>
      <div className={`${styles.languageOption} ${isEnglish ? styles.active : ''}`}>
        <span className={styles.languageText}>English</span>
      </div>
      <div className={`${styles.languageOption} ${!isEnglish ? styles.active : ''}`}>
        <span className={styles.languageText}>한국어</span>
      </div>
    </div>
  );
};

export default ToggleLanguageSwitcher;
