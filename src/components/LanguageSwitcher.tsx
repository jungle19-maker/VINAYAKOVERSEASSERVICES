"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function LanguageSwitcher() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "google-translate-script";

    // Poll to check if Google Translate has injected the HTML
    const checkIsLoaded = setInterval(() => {
      const element = document.getElementById("google_translate_element");
      if (element && element.children.length > 0) {
        setIsLoaded(true);
        clearInterval(checkIsLoaded);
      }
    }, 100);

    // Fallback: stop polling and show anyway after 10000ms
    const timeout = setTimeout(() => {
      clearInterval(checkIsLoaded);
      setIsLoaded(true);
    }, 10000);

    if (!document.getElementById(scriptId)) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
            },
            "google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      clearInterval(checkIsLoaded);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative inline-flex items-center min-h-[40px] min-w-[200px]">
      {/* Modern Skeleton Loader Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 shadow-sm rounded pointer-events-none z-10 animate-pulse">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <div className="w-16 h-3.5 bg-gray-300 rounded"></div>
          </div>
          <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
        </div>
      )}

      {/* Actual Google Translate Element */}
      <div
        id="google_translate_element"
        className={`w-full relative z-20 transition-opacity duration-500 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0 invisible"}`}
      ></div>
    </div>
  );
}
