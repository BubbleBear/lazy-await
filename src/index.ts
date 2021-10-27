type Callable = (...args: any) => any;

type Prediction<T> = T extends Promise<infer U> ? U : T;

type ReturnPrediction<T> = T extends Callable 
    ? (...args: Parameters<T>) => LazyPromise<Prediction<ReturnType<T>>>
    : LazyPromise<Prediction<T>>;

type LazyPromise<T> = {
    [P in keyof T]: ReturnPrediction<T[P]>;
}

export = function chaining<T extends object>(object: T): LazyPromise<T> {
    return new Proxy(object, {
        get(target, key) {
            if (target instanceof Promise) {
                if (target[key] !== undefined) {

                    return target[key].bind(target);
                } else {
                    const mixin = (...args: any) => chaining(target.then((result) => {

                        return result[key].call(result, ...args);
                    }));

                    const promise = Promise.resolve(target.then((result) => {

                        return result[key];
                    }))

                    Object.setPrototypeOf(mixin, Object.getPrototypeOf(promise));

                    return chaining(new Proxy(mixin, {
                        get(target, key) {
                            if (promise[key] !== undefined) {
                                if (typeof promise[key] === 'function') {

                                    return promise[key].bind(promise);
                                }

                                return promise[key];
                            }

                            return target[key];
                        }
                    }))
                }
            } else {
                if (typeof target[key] === 'function') {

                    return (...args: any) => chaining(target[key].call(target, ...args));
                }

                return chaining(target[key]);
            }
        },
    }) as LazyPromise<T>;
}
