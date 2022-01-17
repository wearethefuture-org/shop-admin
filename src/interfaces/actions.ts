export interface IActions {
   type: string,
   data?: any,
}

export interface IActionsImage extends IActions {
   id: number,
   name: string,
   text: string,
   image: string| File| null,
   imageMobile: string| File| null,
   href: string,
   isShown: boolean,
   priority: number
}