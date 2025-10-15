export type ItemType = 'badge' | 'background' | 'theme' | 'avatar' | 'border' | 'other';

export interface Item {
    id : number;
    name : string;
    image_url : string;
    item_type : ItemType;
    price : number;
}