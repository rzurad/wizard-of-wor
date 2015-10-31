import { expect } from 'chai';
import WizardApplication from '../../app/js/application';

describe('WizardApplication class | Unit tests', () => {
    it('is importable', () => {
        expect(WizardApplication).to.be.a('function');
    });
});
