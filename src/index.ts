type Prediction<T> = T extends Promise<infer U> ? U : T;

type ReturnPrediction<T> = (
    ...args: T extends (...args: any) => any
        ? Parameters<T>
        : never
) => T extends (...args: any) => any
    ? LazyPromise<Prediction<ReturnType<T>>>
    : LazyPromise<T>;

type LazyPromise<T> = {
    [P in keyof T]: ReturnPrediction<T[P]>;
}

export = function chaining<T extends object>(object: T) {
    const avatar = new Proxy(object, {
        get(target, key, _) {
            if (target instanceof Promise) {
                if (target[key] !== undefined) {

                    return target[key].bind(target);
                } else {
                    return (...args: any) => chaining(target.then((result) => {

                        if (typeof result[key] === 'function') {
                            return result[key].call(result, ...args);
                        }

                        return result[key];
                    }));
                }
            } else {
                return (...args: any) => {
                    if (typeof target[key] === 'function') {
                        return chaining(target[key].call(target, ...args));
                    }

                    return chaining(target[key]);
                };
            }
        },
    });

    return avatar as LazyPromise<T>;
}
