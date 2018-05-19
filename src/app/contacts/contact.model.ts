export class Contact {
  public id: number;
  public names: string;
  public lastNames: string;

  constructor(id: number, names: string, lastNames: string) {
    this.id = id;
    this.names = names;
    this.lastNames = lastNames;
  }
}
