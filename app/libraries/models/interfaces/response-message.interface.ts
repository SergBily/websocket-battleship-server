export interface ResponseMessage<T> {
  type: string;
  data: T;
  id: number;
}
