class User {
}

class ContactType {
}

class Company {
}

class VisibleFor {
}

class Sale {
}

export class Contact {
  public id: number;
  public names: string;
  public lastNames: string;
  public creationDateTime: Date;
  public createdBy: User;

  public contactType: ContactType;
  // private phones: Map = new Map();
  // private emails: Map = new Map();
  public company: Company;
  public visibleFor: VisibleFor;
  public sales: Set<Sale>;


}
