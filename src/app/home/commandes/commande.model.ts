export class Commande {

    constructor(
        public id: string,
        public userId: string,
        public clientId: string,
        public prenomClient: string,
        public nomClient: string,
        public telClient: string,
        public modelImageUrl: string,
        public typeTissu: string,
        public prix: number,
        public avance: number,
        public reste: number,
        public statutCommande: boolean
    ) {}

}