import ProcessManager from 'processing/process-manager';
import BaseView from 'views/base';

var HumanView;

/*
class HumanView : public IGameView
{
    friend class GameCodeApp;

protected:
    GameViewId m_ViewId;
    ActorId m_ActorId;

    ProcessManager* m_pProcessManager;              // strictly for things like button animations, etc.

    DWORD m_currTick;       // time right now
    DWORD m_lastDraw;       // last time the game rendered
    bool m_runFullSpeed;    // set to true if you want to run full speed

    BaseGameState m_BaseGameState;                  // Added post-press - what is the current game state

    virtual void VRenderText() { };

public:
    bool LoadGame(TiXmlElement* pLevelData);
protected:
    virtual bool VLoadGameDelegate(TiXmlElement* pLevelData) {   VPushElement(m_pScene);  return true; }

public:
    // Implement the IGameView interface, except for the VOnRender() method, which is renderer specific
    virtual HRESULT VOnRestore();
    virtual HRESULT VOnLostDevice();
    virtual void VOnRender(double fTime, float fElapsedTime);
    virtual GameViewType VGetType() { return GameView_Human; }
    virtual GameViewId VGetId() const { return m_ViewId; }

    virtual void VOnAttach(GameViewId vid, ActorId aid)
    {
        m_ViewId = vid;
        m_ActorId = aid;
    }
    virtual LRESULT CALLBACK VOnMsgProc( AppMsg msg );
    virtual void VOnUpdate(const int deltaMilliseconds );

    // Virtual methods to control the layering of interface elements
    virtual void VPushElement(shared_ptr<IScreenElement> pElement);
    virtual void VRemoveElement(shared_ptr<IScreenElement> pElement);

    void TogglePause(bool active);

    virtual ~HumanView();
    HumanView(shared_ptr<IRenderer> renderer);

    ScreenElementList m_ScreenElements;                     // a game screen entity

    // Interface sensitive objects
    shared_ptr<IPointerHandler> m_PointerHandler;
    int m_PointerRadius;
    shared_ptr<IKeyboardHandler> m_KeyboardHandler;

    // Audio
    bool InitAudio();
    ProcessManager* GetProcessManager() { return m_pProcessManager; }

    //Camera adjustments.
    virtual void VSetCameraOffset(const Vec4 & camOffset );

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
HumanView = BaseView.extend({
    timeOfLastRender: 0,

    // TODO: I think this needs access to the WizardApplication.renderer property
    // (and know about when it changes)
    init: function () {
        /* initialize the audio */
        this.set('processManager', ProcessManager.create());
        this.set('screenElements', []);

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
    },

    // onRestore: function () { }, <-- don't think I'll need since I'm not that close to the hardware
    onRender: function (elapsedTime, deltaTime) {
        if (elapsedTime === this.timeOfLastRender) {
            return;
        }

        // clear the render target and the zbuffer

        // render the scene

        // TODO: screens can probably destroy themselves onRender
        // TODO: be smarter about inserting and you won't need the sort
        // TODO: You might not even need any of this at all
        this.screenElements.sort();
        this.screenElements.forEach(function (screen) {
            screen.onRender(elapsedTime, deltaTime);
        });
        
        // walk through all screenElements and call their
        // `onRender` with elapsedTime, deltaTime

        /* Screens are basically anything that draws UI. See if you can think about them
         * in terms of DOM elements. A screen is a DOM element that contains some piece of UI.
         * They are all drawn in the same viewport container because the can just be all
         * positioned absolutely and have various z-indicies
         */

        this.timeOfLastRender = elapsedTime;
    },

    // onLostDevice: function () { }, <-- don't think I'll need since I'm not that close to the hardware
    pushScreen: function (screen) {
        this.screenElements.push(screen);
    },

    popScreen: function () {
        this.screenElements.pop();
    },

    onMessageProcess: function (msg) { console.warn('`onMessageProcess` does not do anything yet'); },

    onUpdate: function (elapsedTime, deltaTime) {
        this.processManager.updateProcesses(deltaTime);
    },

    initAudio: function () { console.warn('`initAudio` does not do anything yet.'); },

    destroy: function () {
        this.processManager.deleteAllProcesses();
        // g_Audio->VShutdown();
    }
});

export default HumanView;
