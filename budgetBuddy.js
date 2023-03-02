(function () {

    const transactions = [];
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    let chart = null;
    let myBudget = new budget(transactions);
    budget.counter = 0;

    const main = document.getElementById("main");
    const tblContainer = document.createElement("div");
    const table = document.createElement("table");
    const tblBody = document.createElement("tbody");
    const select = document.getElementById('expenseText');
    const expenseOptionsArray = getExpenseOptions();    // get Expense type values like entertainment, food etc in an array

    table.classList.add("table");
    tblContainer.classList.add("tblContainer");
    main.appendChild(tblContainer);
    tblContainer.appendChild(table);

    const addBudget = document.querySelector(".addBudget");
    addBudget.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.name.toLowerCase();
        const amount = +document.getElementById('budgetAmount').value;

        if (amount <= 0) {
            document.getElementById("error_msg_budget").innerHTML =
                "<span>Error: Please enter an amount greater than 0 </span>";            
            document.getElementById("budgetAmount").value = null;
        }
        else {
            document.getElementById("error_msg_budget").innerHTML = "";
            const transaction = myBudget.addTransaction(category, '', amount);
            const budgetSumArr = myBudget.getSumByCategory([category]);  // Retrieve sum of amounts by entertainment, food etc.        
            console.log(budgetSumArr);
            updatePageSummary();   // Update Page Budget , Expense & Balance values
            console.log(myBudget.budget);
            console.log(myBudget.balance);
            console.log(myBudget.expense);
            buildTable(transaction, tblContainer, table, tblBody);

            document.getElementById('budgetAmount').value = null;
        }
    });

    const addExpense = document.querySelector(".addExpense");
    addExpense.addEventListener('click', (e) => {
        e.preventDefault();
        let expenseSumArray = [];
        const amount = +document.getElementById('expenseAmount').value;
        const currBudget = +document.getElementById('budget').value;
        const currBalance = +document.getElementById('balance').value;
        console.log(currBalance);
        console.log(amount);
        console.log(currBudget);

        if (amount <= 0) {
            document.getElementById("error_msg_expense").innerHTML =
                "<span>Error: Please enter an amount greater than 0 </span>";
            document.getElementById("expenseAmount").value = null;
        }
        else if (((currBalance - amount)/currBudget * 100) <= 10) {
            document.getElementById("error_msg_expense").innerHTML =
                "<span>Error: Please maintain a balance of more than 10% </span>";
                document.getElementById("expenseAmount").value = null;
        }
        else {
            document.getElementById("error_msg_expense").innerHTML = "";
            const transaction = myBudget.addTransaction("Expense",
                document.getElementById('expenseText').value,
                amount
            );    // each entry is stored in an array of objects

            updatePageSummary();   // Update Page Summary for Budget , Expense & Balance values

            expenseSumArray = myBudget.getSumByCategory(expenseOptionsArray); // Expense Summary Array of objects by category for use in graph
            console.log(expenseSumArray);

            buildTable(transaction, tblContainer, table, tblBody);

            document.getElementById('expenseAmount').value = null;

            let data = google.visualization.arrayToDataTable([
                ['Expense Type', 'Amount'],
                [expenseSumArray[0].text, +expenseSumArray[0].total], //Still need to work on the code, so these values update properly.
                [expenseSumArray[1].text, +expenseSumArray[1].total], //I just hardcoded ones in to see if it would work.
                [expenseSumArray[2].text, +expenseSumArray[2].total], // Anyone have any suggestions?  JI
                [expenseSumArray[3].text, +expenseSumArray[3].total],
            ]);

            let options = {
                title: ''
            };
            chart.draw(data, options);
        }
    })

    function getExpenseOptions() {
        let OptionsArr = [];
        for (let i = 0; i < select.options.length; i++) {
            OptionsArr.push(select.options[i].value);
        }
        return OptionsArr;
    }

    // Upadate Page summary for Budget , Expense & balance when budget/expenses are adjusted
    function updatePageSummary() {
        document.getElementById('budget').value = myBudget.budget;
        document.getElementById('expense').value = myBudget.expense;
        document.getElementById('balance').value = myBudget.balance;
    }

    //Pie Chart code - JI
    function drawChart() {

        let data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Entertainment', 50], //Still need to work on the code, so these values update properly.
            ['Food', 100], //I just hardcoded ones in to see if it would work.
            ['Clothing', 75], // Anyone have any suggestions?  JI
            ['Bills', 500],
        ]);

        let options = {
            title: ''
        };

        chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
    //End of Pie Chart code - JI
}())


function buildTable(obj, table, tblBody) {

    let row = document.createElement('tr');

    for (var val of Object.values(obj)) {
        let col = document.createElement('td');
        col.textContent = val;
        //col.style.border = "1px solid green";
        //col.style.padding = "3px";
        row.appendChild(col);
    }

    row.style.columnWidth = "20 px";
    tblBody.appendChild(row);
    table.appendChild(row);
}


//Just making notes as I think of things:
//Does anyone know how to add that alert if they spend all their budget? JI
//Even if it's just a pop-up alert - if(balance <= 0) and it returns an alert? JI