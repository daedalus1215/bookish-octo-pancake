const data = {
    "information": {
        // Invoice number
        "number": "2021.0001",
        // Invoice data
        "date": "12-12-2021",
        // Invoice due date
        "due-date": "31-12-2023"
    },

    // Now let's add some products! Calculations will be done automatically for you.
    "products": [
        {
            "quantity": "2",
            "description": "Product1",
            "tax-rate": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Product2",
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

// @TODO: Still need to add 
const groupByTaxRate = rows
    .reduce((group, product) => {
        const { taxRate, tax } = product;
        group[taxRate] = group[taxRate] ?? 0;
        group[taxRate] += tax;
        return group;
    }, {});


const totals = rows.reduce((group, product) => {
    
    group['subTotal'] = Number(group['subTotal'] ?? 0);
    group['subTotal'] += +Number(product.preTaxTotal).toFixed(2);
    group['subTotal'] = Number(group['subTotal']).toFixed(2);

    group['tots'] = group['tots'] ?? 0;
    group['tots'] += product.total;

    return group;
}, {})

//@TODO: LALA - do stuff with dates and figuring out if its due
// console.log('groupByTaxRate', groupByTaxRate)
// console.log('totals', totals)
// console.log('product', rows)


console.log('Product | Quantity | Price | Total');
rows.forEach(row => {
    console.log(`${row.name} | ${row.quantity} | ${row.price} | ${row.preTaxTotal}`)
});

console.log(`Subtotal: ${totals.subTotal}`)
for(const [key, value] of Object.entries(groupByTaxRate)){
    console.log(`vat ${key} %: ${value}`);
};
console.log('___________________________')
console.log(`Total: ${totals.tots}`)