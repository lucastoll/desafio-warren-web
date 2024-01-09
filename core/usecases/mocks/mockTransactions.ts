import Transaction from '../../entities/transactions/transactions';

export const mockTransactions: Transaction[] = [
    new Transaction(
        '5f89f9f257fe42957bf6dbfd',
        'Resgate',
        'et labore proident aute nulla',
        'created',
        2078.66,
        '2018-12-22',
        'Aposentadoria',
        'Conta Warren'
    ),
    new Transaction(
        '5f89f9f271e4213092bd4e41',
        'Depósito',
        'excepteur veniam proident irure pariatur',
        'created',
        148856.29,
        '2017-07-23',
        'Trade',
        'Conta Warren'
    ),
    new Transaction(
        '5f89f9f2f318e70ff298f528',
        'Movimentação interna',
        'eu officia laborum labore aute',
        'processed',
        25092.8,
        '2016-08-25',
        'Férias',
        'Trade'
    ),
];