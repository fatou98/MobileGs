import { Customer } from './customer';

export class Order {
    public id: string
    public userId: string
    public customer:Customer;
    public modelImageUrl: string
    public typeTissu: string
    public prix: number
    public avance: number
    public reste: number
    public statutCommande: boolean
}
