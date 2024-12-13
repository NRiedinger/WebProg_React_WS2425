export interface IOrder {
  orderNr: number;
  articles: {
    articleId: string;
    quantity: number;
    price: number;
  }[];
  userId: string;
  orderDate: string;
}
