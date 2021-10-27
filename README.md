# lazy promise

asdf

# Install

    npm install lazy-await

# Usage

given

```javascript
    class A {
        constructor() {
            this.self = this;
        }

        async b(val) {
            console.log(val);

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
            console.log(val);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(new A);
                }, 100);
            });
        }
    }
```


>

```typescript
    const a = new A;

    const ra = (await (await (await (await a.self.b(1)).a(2)).self.b(3)).promiseThis).primitive;

    console.log(ra);
    // expected output: 'primitive'
```

now becomes

```typescript
    import proxy from 'lazy-await';

    const pa = proxy(new A);

    const rpa = await pa.self.b(1).a(2).self.b(3).promiseThis.primitive;

    console.log(rpa);
    // expected output: 'primitive'
```
