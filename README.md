Consider the fact that every commit message is whatever the last spoken sentence I just
happened to overhear at the time of having to write my commit message, be it from something
on the TV, a lyric from a playing song, a genuine "OH", or a random thought that passed through
my head.

Conclusion: If the phrase "pre-alpha" referred to the "cenozoic era", this code
base would be "the electroweak epoch" (this code base is exceptionally young.
If you'd like to play with something more stable than this code base, consider
[Francium](https://www.google.com/search?q=most+unstable+element))

```
# install (needs node.js and npm, obviously)
npm install -g grunt
npm install -g broccoli
npm install -g bower

npm install
bower install
```

```
# build
grunt build
```

```
# build documentation
grunt docco
```

Train of thought:
```
- fiddleApplication.initInstance
- ResourceCache class
    - Should the string table be loaded through the ResourceCache?
- Set up the Renderer
- fiddleApplication.onUpdateGame <-- ALSO: investigate why this is static in C++
- wizardApplication.createGameAndView
```

Make more JS friendly:
```
- C++ initialization is taylored for synchronous file loading:
    - load 'player-options.json'/options file
    - load 'english.json'/string table file
- instance exports for `eventManager` and `eventFactory` are mimicing C++ globals.
```
