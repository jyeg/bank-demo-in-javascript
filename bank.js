var bankList = [];
var people = [];

function Person(name,money){
    this.fullName=name;
    this.moneyOnHand= money;
}

function create_person(name, amount) {
    var newPerson = new Person(name, amount);
    people.push(newPerson);
    console.log("Hi,", name". You have $+"amount"!");
    return newPerson;
}

function Account(name){
    this.accountName=name;
    this.amount=0;
    this.creditBalance = 0;
    this.creditLimit = 0;
}

function Bank(name) {
    this.accounts=[];
    this.bankName=name;
}

Bank.prototype.open_account = function (newcustomer) {
    var newAccount = new Account(newcustomer.fullName);
    this.accounts.push(newAccount);
    console.log(newcustomer.fullName+", thanks for opening an account at", this.bankName);
    return newAccount;
};

Bank.prototype.deposit = function(person, amount){
    // sets the accounts amount.
    if(person.moneyOnHand - amount < 0){
        return console.log(person.fullName,"doesn\'t have enough cash to deposit $"+amount);
    }
    else
    {
        // deducts the amount from the person's pocket money.
        people.filter(function(obj) {
            if(obj.fullName == person.fullName){
                return obj
            }
        })[0].moneyOnHand -= amount

        // updates the users accounts amount.
        var accountAmt = this.accounts.filter(function(obj) {
            if(obj.accountName == person.fullName) {
                return obj
            }
        })[0].amount += amount;

        // writes output to log.
        return console.log(person.fullName, "deposited $"+amount, "to", this.bankName+".",
            person.fullName, "has $"+ person.moneyOnHand+ ".", person.fullName+"'s account has $"
                +accountAmt+".")
    }
};

Bank.prototype.withdraw = function(person, amount){
    // sets the accounts amount.
    var userAmt = this.accounts.filter(function(obj) {
        if(obj.accountName == person.fullName) {
            return obj
        }
    })[0].amount -= amount;
    if(userAmt < 0){
        this.accounts.filter(function(obj) {
            if(obj.accountName == person.fullName) {
                return obj
            }
        })[0].amount += amount;
        return console.log(person.fullName,"doesn't have enough cash to withdraw $"+amount)
    }
    people.filter(function(obj) {
        if(obj.fullName == person.fullName){
            return obj
        }
    })[0].moneyOnHand += amount;

    console.log(person.fullName, "withdrew $"+amount, "from", this.bankName+".",
        person.fullName, "has $"+ person.moneyOnHand+ ".", person.fullName+"\'s account has $"
            +userAmt+".")
};

Bank.prototype.transfer = function(person, bank, amount){
    // sets the accounts amount.
    var userAmt = this.accounts.filter(function(obj) {
        if(obj.accountName == person.fullName) {
            return obj
        }
    })[0].amount -= amount;

    // sets the accounts amount.
    var transferToAmt = bank.accounts.filter(function(obj) {
        if(obj.accountName == person.fullName) {
            return obj
        }
    })[0].amount += amount;

    console.log(person.fullName, "transferred $"+amount, "from the", this.bankName,"account to the", bank.bankName, "account. The",
        this.bankName, "account has $"+ userAmt + "and the", bank.bankName, "account has $"
            +transferToAmt+".");
};

Bank.prototype.issue_credit_card = function(person, amount){
    this.accounts.filter(function(obj) {
        if(obj.accountName == person.fullName) {
            return obj
        }
    })[0].creditLimit += amount;
    console.log(this.bankName, "has issued", person.fullName, " $"+amount, "in credit.");
};

Bank.prototype.spend_on_credit = function(person, amount) {
    var userAccount = this.accounts.filter(function (obj) {
        if (obj.accountName == person.fullName) {
            return obj
        }
    })[0];

    if ((userAccount.creditBalance + amount) >= userAccount.creditLimit) {
        return console.log(person.fullName, "doesn't have $" + amount, "in available credit from", this.bankName);
    }
    userAccount.creditBalance += amount;
    var availLimit = userAccount.creditLimit - userAccount.creditBalance;
    console.log(person.fullName, "charged $" + amount, "and has $"+availLimit,"in available credit from", this.bankName);
};


Bank.prototype.total_cash_in_bank= function(){
    var total = 0;
    for (var i = 0; i < this.accounts.length; i++){
        total += this.accounts[i].amount;
    }
    console.log(this.bankName, "has $"+total, "in the bank");
};


function create_bank(name){
    var newBank = new Bank(name);
    bankList.push(newBank);
    console.log(name, "bank was just created.");
    return newBank
}

var chase = create_bank("JP Morgan Chase");
var wells_fargo = create_bank("Wells Fargo");
var me = create_person("Shehzan", 500);
var friend1 = create_person("John", 1000);
chase.open_account(me);
chase.open_account(friend1);
wells_fargo.open_account(me);
wells_fargo.open_account(friend1);
chase.deposit(me, 200);
chase.deposit(friend1, 300);
chase.withdraw(me, 50);
chase.transfer(me, wells_fargo, 100);
chase.deposit(me, 5000);
chase.withdraw(me, 5000);
chase.total_cash_in_bank();
wells_fargo.total_cash_in_bank();
chase.issue_credit_card(me, 5000);
chase.spend_on_credit(me,6000);
chase.spend_on_credit(me,3000);