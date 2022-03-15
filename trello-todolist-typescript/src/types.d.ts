interface IItem {
  id: string;
  prefix: string;
  content: string;
}

interface IElement {
  [done: string]: IItem[];
  [inProgress : string]: IItem[];
  [todo : string]: IItem[];
}
