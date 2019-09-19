import { Mesure } from './mesure';

export class Customer {
    public id: string;
        public imageUrl: string
        public nom: string
        public prenom: string
        public adresse: string
        public email: string
        public telephone: string
        public mesures: Mesure[]
        public createdAt: Date
        public modifiedAt: Date
        public userId: string
}
