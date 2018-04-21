// los enums permite definir valores numeros q tengan un nombre
export enum TStatus {
	Created,
	Completed,
	Failed,
	Expired
}
export interface ITodo {
	id ?: string;
	content: string;
	status: TStatus;
	description ?: string;
	createdAt ?: any;
}

// guarda un numero, pero al momento de asignarle se le hace de la siguiente manera: TStatus.Created
