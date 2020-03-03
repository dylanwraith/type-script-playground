class PhoneBook {
    private phoneBook: Map<string, string> = new Map<string, string>();
    public addEntry(name: string, number: string) {
        this.phoneBook.set(number, name);
    }
    public searchName(name: string) {
        let number = null;
        this.phoneBook.forEach((_name, _number) => {
            if (_name === name)
                number = _number;
        });
        return number;
    }
    public searchNumber(number: string) {
        let name = this.phoneBook.get(number);
        if (name !== null)
            return name;
        return null;
    }
}

let phoneBook: PhoneBook = new PhoneBook();
phoneBook.addEntry('Michael Johnson', '619-XXX-XXXX');
phoneBook.addEntry('Dylan Wraith', 'XXX-971-XXXX');
console.log(phoneBook.searchName('Michael Johnson'));
console.log(phoneBook.searchNumber('XXX-971-XXXX'));