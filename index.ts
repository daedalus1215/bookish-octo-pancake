const data = {
    "information": {
        // Invoice number
        "number": "2021.0001",
        // Invoice data
        "date": "12-12-2021",
        // Invoice due date
        "due-date": "31-12-2021"
    },

    // Now let's add some products! Calculations will be done automatically for you.
    "products": [
        {
            "quantity": "2",
            "description": "Test1",
            "tax-rate": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Test2",
            "tax-rate": 21,
            "price": 10.45
        }
    ],
};

const rows = data.products
    .map(product => {
        const preTaxTotal = Number((Number(product.price.toFixed(2)) * Number(product.quantity)).toFixed(2));
        const taxRate = Number((Number(product['tax-rate']) / 100).toPrecision());
        const tax = Number(Number((preTaxTotal * taxRate).toFixed(2)).toPrecision(4));

        return {
            name: product.description,
            taxRate: product['tax-rate'],
            price: product.price,
            quantity: product.quantity,
            preTaxTotal,
            tax,
            total: preTaxTotal + tax,
        }
    }, {});

// console.log('rows', rows)
let array = [];

const groupByTaxRate = rows
    .reduce((group, product) => {
        const { taxRate, tax } = product;
        group[taxRate] = group[taxRate] ?? [];
        group[taxRate].push({
            label: `vat ${taxRate}%`,
            value: tax
        });
        return group;
    }, {});

// rows.map(row => );

console.log('groupByTaxRate', groupByTaxRate)