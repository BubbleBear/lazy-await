declare type Prediction<T> = T extends Promise<infer U> ? U : T;
declare type ReturnPrediction<T> = (...args: T extends (...args: any) => any ? Parameters<T> : never) => T extends (...args: any) => any ? LazyPromise<Prediction<ReturnType<T>>> : LazyPromise<Prediction<T>>;
declare type LazyPromise<T> = {
    [P in keyof T]: ReturnPrediction<T[P]>;
};
declare const _default: <T extends object>(object: T) => LazyPromise<T>;
export = _default;
