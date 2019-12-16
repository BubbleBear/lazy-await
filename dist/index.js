"use strict";
module.exports = function chaining(object) {
    const avatar = new Proxy(object, {
        get(target, key, _) {
            if (target instanceof Promise) {
                if (target[key] !== undefined) {
                    return target[key].bind(target);
                }
                else {
                    return (...args) => chaining(target.then((result) => {
                        if (typeof result[key] === 'function') {
                            return result[key].call(result, ...args);
                        }
                        return result[key];
                    }));
                }
            }
            else {
                return (...args) => {
                    if (typeof target[key] === 'function') {
                        return chaining(target[key].call(target, ...args));
                    }
                    return chaining(target[key]);
                };
            }
        },
    });
    return avatar;
};
