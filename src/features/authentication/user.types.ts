export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface PasswordData {
  password: string;
  passwordConfirm: string;
}

export interface ResetPasswordData {
  resetToken: string;
  passwords: PasswordData;
}

export interface UpdateUserData {
  fullName?: string;
  avatar?: File;
}

export interface UpdateUserPasswordData {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  role: 'demo' | 'staff' | 'manager' | 'admin';
  createdAt: string;
  updatedAt: string;
  lastSignIn: string;
}
