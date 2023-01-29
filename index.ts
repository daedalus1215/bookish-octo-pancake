const data2 = {
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

// Helpers
type formatNum = (decimal: number) => string;
const formatNumber: formatNum = (decimal) => Number(Number(decimal).toPrecision(6)).toFixed(2);


const newRows = data2.products.map(product => {
    const quantity = Number(product.quantity);
    const preTaxTotal = Number(product.price) * quantity;
    const taxConversion = Number(Number(product["tax-rate"]) / 100);

    return {
        name: product.description,
        quantity: product.quantity,
        price: product.price,
        preTaxTotal: preTaxTotal,
        taxRate: product["tax-rate"],
        taxed: preTaxTotal * taxConversion,
        totalWithTax: preTaxTotal + (preTaxTotal * taxConversion),
    };
});
 
/**
 * if performance is not a concern we can iterate again.
 * if performance is a concern, we probs should loop once and grab these details as well as the newRow details
 */
const groupByTaxRate2 = newRows.reduce((group:any, product) => {
    const {taxRate, taxed} = product;
    group[taxRate] = group[taxRate] ?? 0;
    group[taxRate] = formatNumber(taxed);
    return group;
}, {});

const totals2 = newRows.reduce((group:{subTotal: number, total: number}, product) => {
    group['subTotal'] += Number(product.preTaxTotal);
    group['total'] += Number(product.totalWithTax);
    return group;
}, {subTotal: 0, total: 0});


// console.log('rows', newRows);

// console.log('groupByTaxRate2', groupByTaxRate2);



console.log('Products | Quantity | Price | Total');
console.log('____________________________');
newRows.forEach(row => {
    console.log(`${row.name} | ${row.quantity} | ${row.price} | ${row.preTaxTotal}`);
});
console.log('____________________________');
console.log(' ');
console.log(' ');
console.log(' ');
console.log('                           Subtotal: $' + formatNumber(totals2.subTotal))
for (const [key, value] of Object.entries(groupByTaxRate2)) {
    console.log(`                               vat ${key}%: $${value}`);
}
console.log('                   _________________________');
console.log(' ');
console.log('                              Total: ' + formatNumber(totals2.total));


const [day, month, year] = data2.information['due-date'].split('-');

if ( new Date(`${year}-${month}-${day}`).getTime() < Date.now()) {
    console.log('invoice is past due');
} else {
    console.log('invoice is not past due')
}