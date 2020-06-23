export interface ICustomer {
    id: number;
    author_name: string;
    books: string;
    twitter: string;
    twitter_url: any;
}

export interface IOrder {
    customerId: number;
    orderItems: IOrderItem[];
}

export interface IOrderItem {
    id: number;
    booksName: string;
    url: string;
}
