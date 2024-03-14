export class Category {
  id: number;
  name: string;
  icon: string;

  constructor(id: number = 0, name: string = '', icon: string = '') {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }
}

