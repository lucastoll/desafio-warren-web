export default class Transaction {
	private _id: string;
	private _title: string;
	private _description: string;
	private _status: string;
	private _amount: number;
	private _date: string;
	private _from: string;
	private _to: string;

	constructor(
		id: string,
		title: string,
		description: string,
		status: string,
		amount: number,
		date: string,
		from: string,
		to: string,
	) {
		this._id = id;
		this._title = title;
		this._description = description;
		this._status = status;
		this._amount = amount;
		this._date = date;
		this._from = from;
		this._to = to;
	}

	get id(): string {
		return this._id;
	}

	set id(value: string) {
		if (value === '') {
			throw new Error('Property ID cannot be empty');
		}
		this._id = value;
	}

	get title(): string {
		return this._title;
	}

	set title(value: string) {
		if (value === '') {
			throw new Error('Property title cannot be empty');
		}
		this._title = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		if (value === '') {
			throw new Error('Property description cannot be empty');
		}
		this._description = value;
	}

	get status(): string {
		return this._status;
	}

	set status(value: string) {
		if (value === '') {
			throw new Error('Property status cannot be empty');
		}
		this._status = value;
	}

	get amount(): number {
		return this._amount;
	}

	set amount(value: number) {
		if (value <= 0) {
			throw new Error('Property amount cannot be less than or equal to 0');
		}
		this._amount = value;
	}

	get date(): string {
		return this._date;
	}

set date(value: string) {
    if (value === '') {
        throw new Error('Property date cannot be empty');
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
        throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
    }

    this._date = value;
}
	get from(): string {
		return this._from;
	}

	set from(value: string) {
		if (value === '') {
			throw new Error('Property from cannot be empty');
		}
		this._from = value;
	}

	get to(): string {
		return this._to;
	}

	set to(value: string) {
		if (value === '') {
			throw new Error('Property to cannot be empty');
		}
		this._to = value;
	}
}
