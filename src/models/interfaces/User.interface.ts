export interface User {
  name: string;
  password: string;
}

export interface UserDatabase extends User {
  index: number
}
