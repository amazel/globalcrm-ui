import {VisibleFor} from "./visible-for.enum";
import {Contact} from "./contact.model";
import {Account} from "./account.model";

export class Company {
  public id: number;
  public name: string;
  public account: Account;
  public created: Date;
  public address: string;
  public zipCode: string;
  public city: string;
  public state: string;
  public visibleFor: VisibleFor;
  public contacts = new Set<Contact>();
}
