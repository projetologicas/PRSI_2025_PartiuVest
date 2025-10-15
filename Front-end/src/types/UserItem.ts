import type { Item } from "./Item";
import type { User } from "./User";

export interface UserItem {
    item : Item;
    user : User;
    acquisition_date : Date;
}