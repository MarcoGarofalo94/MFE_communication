export interface OptionsState {
  options: Option[];
  isLoading: boolean;
  error: OptionsError;
}

export type OptionsError =  NCResponseError | Error | null;

export interface NCResponseError {
  success: boolean;
  message: string;
  class?: string;
}

export interface OptionsResponse {
  success: boolean;
  result: Option[];
}

export interface Option {
  value: string;
  label: string;
}
