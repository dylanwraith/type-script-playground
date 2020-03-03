var PhoneBook = /** @class */ (function () {
    function PhoneBook() {
        this.phoneBook = new Map();
    }
    PhoneBook.prototype.addEntry = function (name, number) {
        this.phoneBook.set(number, name);
    };
    PhoneBook.prototype.searchName = function (name) {
        var number = null;
        this.phoneBook.forEach(function (_name, _number) {
            if (_name === name)
                number = _number;
        });
        return number;
    };
    PhoneBook.prototype.searchNumber = function (number) {
        var name = this.phoneBook.get(number);
        if (name !== null)
            return name;
        return null;
    };
    return PhoneBook;
}());
var phoneBook = new PhoneBook();
phoneBook.addEntry('Michael Johnson', '619-XXX-XXXX');
phoneBook.addEntry('Dylan Wraith', 'XXX-971-XXXX');
console.log(phoneBook.searchName('Michael Johnson'));
console.log(phoneBook.searchNumber('XXX-971-XXXX'));
