class User {
}

class ContactType {
}

class Company {
}

class VisibleFor {
}

export class Contact {
  public id: number;
  public names: string;
  public lastNames: string;
  private creationDateTime: Date;
  private createdBy: User;

  private contactType: ContactType;
  private phones: Map = new Map();
  private emails: Map = new Map();
  private company: Company;
  private visibleFor: VisibleFor;
  private sales: Set;


}
