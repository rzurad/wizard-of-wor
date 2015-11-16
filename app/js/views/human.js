import ProcessManager from '../processing/process-manager';
import BaseView from './base';

/*

public:

    // Added post press
    shared_ptr<ScreenElementScene> m_pScene;
    shared_ptr<CameraNode> m_pCamera;

    void HandleGameState(BaseGameState newState);

    // Added post press - this helps the network system attach views to the right actor.
    virtual void VSetControlledActor(ActorId actorId) { m_ActorId = actorId; }

    // Event delegates
    void PlaySoundDelegate(IEventDataPtr pEventData);
    void GameStateDelegate(IEventDataPtr pEventData);

private:
    void RegisterAllDelegates(void);
    void RemoveAllDelegates(void);
 */
export default class HumanView extends BaseView {
    onAttach(viewId, actorId) {
        this._viewId = viewId;
        this._actorId = actorId;
    }

    _renderText() { }
    _loadGameDelegate(levelData) { return true; }

    loadGame(levelData) { }
    togglePause(active) { }
    setCameraOffset(camOffest) { } // argument is a Vec4

    getProcessManager() { return this._processManager; }

    constructor(renderer) {
        super();

        this._viewId;
        this._actorId;

        this._runFullSpeed; // set to true if you want to run full speed
        this._baseGameState;
        this._lastDraw; // last time the game rendered
        this._currTick; // time right now

        /* initialize the audio */
        this._processManager = new ProcessManager(); // strictly for things like button animations, etc.
        this.screenElements = [];
        this.pointerHandler;
        this.pointerRadius;
        this.keyboardHandler;


        /* register all delegates */
        /* set base game state to initializing */
        /* scene.reset(ScreenElementScene.create({ renderer: renderer }) */
        /* create the camera */
        /* add the camera as a child to the scene */
        /* set the camera to be the camera of the scene */
        /*

        InitAudio();

        m_pProcessManager = GCC_NEW ProcessManager;

        m_PointerRadius = 1;    // we assume we are on a mouse enabled machine - if this were a tablet we should detect it here.
        m_ViewId = gc_InvalidGameViewId;

        // Added post press for move, new, and destroy actor events and others
        RegisterAllDelegates();
        m_BaseGameState = BGS_Initializing;     // what is the current game state

        if (renderer)
        {
            // Moved to the HumanView class post press
            m_pScene.reset(GCC_NEW ScreenElementScene(renderer));

            Frustum frustum;
            frustum.Init(GCC_PI/4.0f, 1.0f, 1.0f, 100.0f);
            m_pCamera.reset(GCC_NEW CameraNode(&Mat4x4::g_Identity, frustum));
            GCC_ASSERT(m_pScene && m_pCamera && _T("Out of memory"));

            m_pScene->VAddChild(INVALID_ACTOR_ID, m_pCamera);
            m_pScene->SetCamera(m_pCamera);
        }
        */
    }

    onRestore() {
        this.screenElements.forEach(function (screen) {
            screen.onRestore();
        });
    }

    onLostDevice() {
        this.screenElements.forEach(function (screen) {
            screen.onLostDevice();
        });
    }

    getType() { return GameView.Human; }
    getId() { return this._viewId; }

    onRender(elapsedTime, deltaTime) {
        this.currTick = timeGetTime();

        if (elapsedTime === this.timeOfLastRender) {
            return;
        }

        // clear the render target and the zbuffer

        // render the scene
        if (this.runFullSpeed || currTick - lastDraw > SCREEN_REFRESH_RATE) {
            if (gameApp.renderer.preRender()) {
                this.renderText();

                // TODO: screens can probably destroy themselves onRender
                // TODO: be smarter about inserting and you won't need the sort
                // TODO: You might not even need any of this at all
                /* Screens are basically anything that draws UI. See if you can think about them
                 * in terms of DOM elements. A screen is a DOM element that contains some piece of UI.
                 * They are all drawn in the same viewport container because the can just be all
                 * positioned absolutely and have various z-indicies
                 */
                this.screenElements.sort();
                this.screenElements.forEach(function (screen) {
                    if (screen.isVisible) {
                        screen.onRender(elapsedTime, deltaTime);
                    }
                });

                this.lastDraw = this.currTick;
            }

            gameApp.renderer.postRender();
        }
    }

    pushScreen(screen) {
        this.screenElements.push(screen);
    }

    popScreen() {
        this.screenElements.pop();
    }

    onMessageProcess(msg) { console.warn('`onMessageProcess` does not do anything yet', msg); }

    onUpdate(elapsedTime, deltaTime) {
        this.processManager.updateProcesses(deltaTime);

        this.screenElements.forEach(function (screen) {
            screen.onUpdate(deltaTime);
        });
    }

    initAudio() { console.warn('`initAudio` does not do anything yet.'); }

    destroy() {
        this.processManager.deleteAllProcesses();
        // g_Audio->VShutdown();
    }
}
