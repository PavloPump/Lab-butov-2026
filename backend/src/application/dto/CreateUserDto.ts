import { UserRole } from '../../domain/entities/User';

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
}
