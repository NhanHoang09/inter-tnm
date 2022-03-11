
interface IItem {
  id: string,
  prefix: string,
  content: string
}


interface IElement {
  done: IItem[],
  inProgress: IItem[],
  todo: IItem[], 
}

