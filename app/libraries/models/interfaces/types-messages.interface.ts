export interface TypesMessages {
  reg: MessageCallback;
  create_room: MessageCallback;
  add_user_to_room: MessageCallback;
  add_ships: MessageCallback;
}

type MessageCallback = (data: string, idClient: number) => void;
