export default class Transaction {
    private _id;
    private _title;
    private _description;
    private _status;
    private _amount;
    private _date;
    private _from;
    private _to;
    constructor(id: string, title: string, description: string, status: string, amount: number, date: string, from: string, to: string);
    get id(): string;
    set id(value: string);
    get title(): string;
    set title(value: string);
    get description(): string;
    set description(value: string);
    get status(): string;
    set status(value: string);
    get amount(): number;
    set amount(value: number);
    get date(): string;
    set date(value: string);
    get from(): string;
    set from(value: string);
    get to(): string;
    set to(value: string);
}
