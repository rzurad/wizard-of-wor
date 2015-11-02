import { expect } from 'chai';
import WizardApplication from '../../app/js/application';
import WizardLogic from '../../app/js/logic';

describe('WizardApplication | Unit tests | class:', function () {
    it('is importable', function () {
        expect(WizardApplication).to.be.a('function');
    });

    it('can be constructed with default arguments', function () {
        let app = new WizardApplication();

        expect(app).to.be.a('object');
        expect(app.isRunning).to.equal(false);
        expect(app.height).to.equal(0);
        expect(app.width).to.equal(0);
        expect(app.viewportSelector).to.equal('body');
        expect(app.options).to.be.a('object');
    });
});

describe('WizardApplication | Unit tests | onUpdate:', function () {
    it('does not call game.onUpdate if the app is not running', function () {
        let app = new WizardApplication();

        app.game = { onUpdate() { expect(false).to.equal(true); } };

        expect(app.isRunning).to.equal(false);

        app.onUpdate(0, 0);
    });

    it('calls game.onUpdate with time if app is running', function () {
        let app = new WizardApplication(),
            called = false;

        app.game = {
            onUpdate(elapsedTime, deltaTime) {
                called = true;

                expect(elapsedTime).to.equal(10);
                expect(deltaTime).to.equal(20);
            }
        };

        app.isRunning = true;
        app.onUpdate(10, 20);

        expect(called).to.equal(true);
    });

    it('does not die if there is no game object', function () {
        let app = new WizardApplication();

        app.onUpdate(0, 0);
    });
});

describe('WizardApplication | Unit tests | createGameAndView:', function () {
    it('can be called without error', function () {
        let app = new WizardApplication();

        app.createGameAndView();

        expect(app.game instanceof WizardLogic).to.equal(true);
    });
});

describe('WizardApplication | Unit tests | onRender:', function () {
    it('can be called even when game is not running', function () {
        let app = new WizardApplication(),
            called = false;

        app.game = {
            onRender(elapsedTime, deltaTime) {
                called = true;

                expect(elapsedTime).to.equal(10);
                expect(deltaTime).to.equal(20);
            }
        };

        app.onRender(10, 20);
        expect(called).to.equal(true);
    });

    it('does not die if there is no game object', function () {
        let app = new WizardApplication();

        app.onRender(0, 0);
    });
});

describe('WizardApplication | Unit tests | init:', function () {

});
