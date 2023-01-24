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



console.log(data.products
.map(product => ({
    ...product,
    total: (Number(product.price.toFixed(2)) * Number(product.quantity)).toFixed(2),
})))