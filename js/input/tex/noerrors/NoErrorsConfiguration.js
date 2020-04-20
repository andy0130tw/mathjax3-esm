import { Configuration } from '../Configuration.js';
function noErrors(factory, message, id, expr) {
    var mtext = factory.create('token', 'mtext', {}, expr.replace(/\n/g, ' '));
    var error = factory.create('node', 'merror', [mtext], { 'data-mjx-error': message });
    return error;
}
;
export var NoErrorsConfiguration = Configuration.create('noerrors', { nodes: { 'error': noErrors } });
//# sourceMappingURL=NoErrorsConfiguration.js.map