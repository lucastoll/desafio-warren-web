var Transaction = /** @class */ (function () {
    function Transaction(id, title, description, status, amount, date, from, to) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._status = status;
        this._amount = amount;
        this._date = date;
        this._from = from;
        this._to = to;
    }
    Object.defineProperty(Transaction.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            if (value === '') {
                throw new Error('Property ID cannot be empty');
            }
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            if (value === '') {
                throw new Error('Property title cannot be empty');
            }
            this._title = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (value) {
            if (value === '') {
                throw new Error('Property description cannot be empty');
            }
            this._description = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            if (value === '') {
                throw new Error('Property status cannot be empty');
            }
            this._status = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        set: function (value) {
            if (value <= 0) {
                throw new Error('Property amount cannot be less than or equal to 0');
            }
            this._amount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (value) {
            if (value === '') {
                throw new Error('Property date cannot be empty');
            }
            var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(value)) {
                throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
            }
            this._date = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "from", {
        get: function () {
            return this._from;
        },
        set: function (value) {
            if (value === '') {
                throw new Error('Property from cannot be empty');
            }
            this._from = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "to", {
        get: function () {
            return this._to;
        },
        set: function (value) {
            if (value === '') {
                throw new Error('Property to cannot be empty');
            }
            this._to = value;
        },
        enumerable: false,
        configurable: true
    });
    return Transaction;
}());
export default Transaction;
//# sourceMappingURL=transactions.js.map