"use strict";
module.exports = function chaining(object) {
    return new Proxy(object, {
        get(target, key) {
            if (target instanceof Promise) {
                if (target[key] !== undefined) {
                    return target[key].bind(target);
                }
                else {
                    const mixin = (...args) => chaining(target.then((result) => {
                        return result[key].call(result, ...args);
                    }));
                    const promise = Promise.resolve(target.then((result) => {
                        return result[key];
                    }));
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
                    }));
                }
            }
            else {
                if (typeof target[key] === 'function') {
                    return (...args) => chaining(target[key].call(target, ...args));
                }
                return chaining(target[key]);
            }
        },
    });
};
