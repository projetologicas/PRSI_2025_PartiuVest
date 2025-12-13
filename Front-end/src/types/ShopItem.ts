export interface ShopItem {
    id: number;
    name: string;
    image_url: string; // <--- Nome do campo no Java
    type: 'AVATAR' | 'TITLE' | 'THEME';
    price: number;
}