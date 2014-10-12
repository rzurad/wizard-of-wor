// Tie together jQuery and RSVP (which we don't have since we're using
// ember packages instead of all of Ember.js
(function (g) {
    g.RSVP.onerrorDefault = function (error) {
        g.Ember.Logger.error(error.stack);
        g.Ember.Logger.assert(error, false);
    };

    g.RSVP.on('error', g.RSVP.onerrorDefault);

    g.Ember.$ = g.jQuery;
    g.Ember.RSVP = g.RSVP;
}(window));
