"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function LanguageSwitcher() {
  useEffect(() => {
    let scriptLoaded = false;
    
    // Check if script is already present
    const existingScript = document.getElementById("google-translate-script");
    if (!existingScript) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            { 
              pageLanguage: "en", 
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
            },
            "google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div id="google_translate_element" className="min-w-[140px] flex items-center justify-center"></div>
  );
}
