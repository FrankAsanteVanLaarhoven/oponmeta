// Translation APIs Integration
// Supports Microsoft Translator (2M characters/month free) and Google Translate (500K characters/month free)

interface TranslationAPI {
  translate: (text: string, from: string, to: string) => Promise<string>;
  detectLanguage: (text: string) => Promise<string>;
  isAvailable: () => boolean;
}

// Microsoft Translator API (2M characters/month free)
export class MicrosoftTranslatorAPI implements TranslationAPI {
  private readonly apiKey: string;
  private readonly endpoint = 'https://api.cognitive.microsofttranslator.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async translate(text: string, from: string, to: string): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Microsoft Translator API key not configured');
    }

    try {
      const response = await fetch(`${this.endpoint}/translate?api-version=3.0&from=${from}&to=${to}`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey,
          'Content-Type': 'application/json',
          'X-ClientTraceId': this.generateTraceId(),
        },
        body: JSON.stringify([{ text }])
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result?.[0]?.translations?.[0]?.text || text;
    } catch (error) {
      console.error('Microsoft Translator API error:', error);
      return text;
    }
  }

  async detectLanguage(text: string): Promise<string> {
    if (!this.isAvailable()) {
      return 'en';
    }

    try {
      const response = await fetch(`${this.endpoint}/detect?api-version=3.0`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey,
          'Content-Type': 'application/json',
          'X-ClientTraceId': this.generateTraceId(),
        },
        body: JSON.stringify([{ text }])
      });

      if (!response.ok) {
        return 'en';
      }

      const result = await response.json();
      return result?.[0]?.language || 'en';
    } catch (error) {
      console.error('Language detection failed:', error);
      return 'en';
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
  }

  private generateTraceId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

// Google Translate API (500K characters/month free)
export class GoogleTranslateAPI implements TranslationAPI {
  private readonly apiKey: string;
  private readonly endpoint = 'https://translation.googleapis.com/language/translate/v2';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async translate(text: string, from: string, to: string): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Google Translate API key not configured');
    }

    try {
      const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: from === 'auto' ? undefined : from,
          target: to,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result?.data?.translations?.[0]?.translatedText || text;
    } catch (error) {
      console.error('Google Translate API error:', error);
      return text;
    }
  }

  async detectLanguage(text: string): Promise<string> {
    if (!this.isAvailable()) {
      return 'en';
    }

    try {
      const response = await fetch(`${this.endpoint}/detect?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text })
      });

      if (!response.ok) {
        return 'en';
      }

      const result = await response.json();
      return result?.data?.detections?.[0]?.[0]?.language || 'en';
    } catch (error) {
      console.error('Language detection failed:', error);
      return 'en';
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
  }
}

// Free Translation API (no key required, limited usage)
export class FreeTranslationAPI implements TranslationAPI {
  private readonly endpoint = 'https://api.mymemory.translated.net/get';

  async translate(text: string, from: string, to: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.endpoint}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
      );

      if (!response.ok) {
        return text;
      }

      const result = await response.json();
      return result?.responseData?.translatedText || text;
    } catch (error) {
      console.error('Free Translation API error:', error);
      return text;
    }
  }

  async detectLanguage(text: string): Promise<string> {
    // Free API doesn't support language detection
    return 'en';
  }

  isAvailable(): boolean {
    return true; // Always available
  }
}

// Translation Manager - Orchestrates multiple APIs
export class TranslationManager {
  private apis: TranslationAPI[];

  constructor() {
    this.apis = [
      new MicrosoftTranslatorAPI(import.meta.env.VITE_MICROSOFT_TRANSLATOR_KEY || ''),
      new GoogleTranslateAPI(import.meta.env.VITE_GOOGLE_TRANSLATE_KEY || ''),
      new FreeTranslationAPI(), // Fallback
    ];
  }

  async translate(text: string, from: string, to: string): Promise<string> {
    for (const api of this.apis) {
      if (api.isAvailable()) {
        try {
          const result = await api.translate(text, from, to);
          if (result && result !== text) {
            return result;
          }
        } catch (error) {
          console.warn(`Translation API failed, trying next:`, error);
          continue;
        }
      }
    }
    return text; // Return original text if all APIs fail
  }

  async detectLanguage(text: string): Promise<string> {
    for (const api of this.apis) {
      if (api.isAvailable()) {
        try {
          const result = await api.detectLanguage(text);
          if (result && result !== 'en') {
            return result;
          }
        } catch (error) {
          console.warn(`Language detection failed, trying next:`, error);
          continue;
        }
      }
    }
    return 'en';
  }

  getAvailableAPIs(): string[] {
    return this.apis
      .filter(api => api.isAvailable())
      .map(api => api.constructor.name);
  }
}

// Export singleton instance
export const translationManager = new TranslationManager();
