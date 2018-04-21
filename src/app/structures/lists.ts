export interface IList {
  // el id y createdAt es opcional porque se va generar por firebase
  id ?: string;
  title: string;
  createdAt ?: any;
}
