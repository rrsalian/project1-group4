class budget {
    id = 0;
    category;
    text;
    amount;
    transactions = [];

    constructor(transactions) {        
        this.transactions;              
    } 

    addTransaction(category, text, amount) {        
        let transaction = {};
        transaction.id = ++budget.counter;
        transaction.category = category;
        transaction.text = text;
        transaction.amount = amount;        
        this.transactions.push(transaction); 
        return transaction;   
    }

    deleteTransaction(id) {
        const index = this.transactions.find(element => element.id = id);
        this.transactions.splice(index,1);
    }
}