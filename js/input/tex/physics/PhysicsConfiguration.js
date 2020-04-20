var _a;
import { Configuration } from '../Configuration.js';
import { AutoOpen } from './PhysicsItems.js';
import './PhysicsMappings.js';
export var PhysicsConfiguration = Configuration.create('physics', {
    handler: {
        macro: [
            'Physics-automatic-bracing-macros',
            'Physics-vector-macros',
            'Physics-vector-chars',
            'Physics-derivative-macros',
            'Physics-expressions-macros',
            'Physics-quick-quad-macros',
            'Physics-bra-ket-macros',
            'Physics-matrix-macros'
        ],
        character: ['Physics-characters'],
        environment: ['Physics-aux-envs']
    },
    items: (_a = {},
        _a[AutoOpen.prototype.kind] = AutoOpen,
        _a)
});
//# sourceMappingURL=PhysicsConfiguration.js.map