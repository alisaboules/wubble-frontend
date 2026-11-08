export interface TAuthFormData {
  email: string;
  password: string;
  name: string;
}

export interface TAuthForm extends TAuthFormData{
  confirmPassword?: string
}