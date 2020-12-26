export interface IActions {
   type: string,
   data?: any
}

export interface IActionsImage extends IActions {
   id: number,
   name: string,
   text: string,
   image: string,
   href: string,
   isShown: boolean,
   priority: number
}