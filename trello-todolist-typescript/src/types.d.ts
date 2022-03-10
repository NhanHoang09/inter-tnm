
interface IItem {
  id: string,
  prefix: string,
  content: string
}


interface IElement {
  column1: IItem[],
  column2: IItem[],
  column3: IItem[], 
}

