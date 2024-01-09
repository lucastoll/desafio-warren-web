export default class Transaction{
    constructor() {
        this.id = 0
        this.description = '';
        this.title = '';
        this.status = '';
        this.amount = 0;
        this.date = '';
        this.from = '';
        this.to = '';
    }

    id: number;
    title: string;
    description: string;
    status: string;
    amount: number;
    date: string;
    from: string;
    to: string;
}[];