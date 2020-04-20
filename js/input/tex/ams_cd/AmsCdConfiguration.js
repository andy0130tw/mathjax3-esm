import { Configuration } from '../Configuration.js';
import './AmsCdMappings.js';
export var AmsCdConfiguration = Configuration.create('amsCd', { handler: {
        character: ['amsCd_special'],
        macro: ['amsCd_macros'],
        environment: ['amsCd_environment']
    },
    options: {
        amsCd: {
            colspace: '5pt',
            rowspace: '5pt',
            harrowsize: '2.75em',
            varrowsize: '1.75em',
            hideHorizontalLabels: false
        }
    } });
//# sourceMappingURL=AmsCdConfiguration.js.map