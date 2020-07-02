import Bandoneon from './bandoneon';

new Bandoneon('.bandoneon:not(.is-multiple) li', '.trigger').activate();
new Bandoneon('.bandoneon.is-multiple li', '.trigger', { multiple: true }).activate();
