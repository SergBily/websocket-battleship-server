import { UserDatabase } from '../interfaces/user.interface';

export class UserDto {
  name!: string;

  index: number;

  error!: boolean;

  errorText!: string;

  constructor(userData: UserDatabase) {
    this.name = userData.name;
    this.index = userData.index;
    this.error = false;
    this.errorText = '';
  }
}
