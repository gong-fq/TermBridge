export interface TechnicalTerm {
  original: string;
  translation: string;
  explanation: string;
}

export interface TranslationResponse {
  translatedText: string;
  technicalTerms: TechnicalTerm[];
}

export interface TranslationState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: TranslationResponse | null;
  error: string | null;
}
