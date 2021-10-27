class A {
    constructor() {
        this.self = this;
    }

    async b(val) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new B);
            }, 100);
        });
    }
}

class B {
    constructor() {
        this.primitive = 'primitive';

        this.promiseThis = Promise.resolve(this);
    }

    async a(val) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new A);
            }, 100);
        });
    }
}

module.exports = {
    A, B
}
