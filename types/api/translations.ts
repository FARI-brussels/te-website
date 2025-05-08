export interface TranslationInput {
  languages_code: string;
  [key: string]: string;
}

export interface TranslationOutput {
  [key: string]: Record<string, string>;
}
