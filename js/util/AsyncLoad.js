import { mathjax } from '../mathjax.js';
export function asyncLoad(name) {
    if (!mathjax.asyncLoad) {
        return Promise.reject("Can't load '" + name + "': No asyncLoad method specified");
    }
    return new Promise(function (ok, fail) {
        var result = mathjax.asyncLoad(name);
        if (result instanceof Promise) {
            result.then(function (value) { return ok(value); }).catch(function (err) { return fail(err); });
        }
        else {
            ok(result);
        }
    });
}
//# sourceMappingURL=AsyncLoad.js.map