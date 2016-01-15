import BaseGameLogic from '../engine/fiddle/base-game-logic';
import WizardHumanView from './wizard-human-view';
import AIWizardView from './ai-wizard-view';

export default class WizardLogic extends BaseGameLogic {
    addView(view, actorId) {
        super.addView(view, actorId);

        if (view instanceof WizardHumanView) {
            this.humanPlayersAttached++;
        } else if (view instanceof AIWizardView) {
            this.AIPlayersAttached++;
        }
    }
}
