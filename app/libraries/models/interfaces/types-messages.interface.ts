export interface TypesMessages {
  reg: (data: string, idClient: number) => void;
  create_room: (data: string, idClient: number) => void;
  add_user_to_room: (data: string, idClient: number) => void;
}
