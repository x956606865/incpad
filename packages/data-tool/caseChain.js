const SymbolTable = {
    header: Symbol(),
    tail: Symbol(),
    initCaseChain: Symbol(),
    appendCaseToChain: Symbol('appendCaseToChain'),
};

class CaseChain {
    constructor() {
        this[SymbolTable.header] = null;
        this[SymbolTable.tail] = null;
    }

    appendCase(item) {
        if (!(item instanceof Case)) {
            throw new Error('item must be instance of Case Class');
        }
        if (this[SymbolTable.header] === null) {
            this[SymbolTable.initCaseChain](item);
        } else {
            this[SymbolTable.appendCaseToChain](item);
        }
    }

    [SymbolTable.initCaseChain](item) {
        this[SymbolTable.header] = item;
        this[SymbolTable.tail] = item;
    }

    [SymbolTable.appendCaseToChain](item) {
        this[SymbolTable.tail].setNext(item);
        this[SymbolTable.tail] = item;
    }

    run(options) {
        const { data, once } = Object.assign(
            {
                data: null,
                once: false,
            },
            options
        );
        let current = this[SymbolTable.header],
            flag = false;
        const resultArray = [];
        while (current !== null) {
            console.log('run with: ', current.handle.name);
            flag = current.test(data);
            if (!flag) {
                current = current.next;
                continue;
            }
            //if once is true,just handle and return
            if (once) {
                return current.handle(data);
            }
            resultArray.push({
                by: current.handle.name,
                result: current.handle(data),
            });
            current = current.next;
        }
    }
}

class Case {
    constructor(match, handle) {
        if (typeof match === 'string') {
            this.test = testString;
        } else if (typeof match === 'function') {
            this.test = match;
        } else if (match instanceof RegExp) {
            this.test = testReg;
        } else {
            this.test = alwaysFalse;
        }
        this.match = match;
        this.handle = handle;
        this.next = null;
    }

    setNext(next) {
        this.next = next;
    }
}

function testString(target) {
    return this.match === target;
}

function testReg(target) {
    return this.match.test(target);
}

function alwaysFalse() {
    return false;
}

module.exports = {
    Case,
    CaseChain,
};
