// this has memory management code in it as proof-of-concept. also, this res cache
// seems to only care about one res file, so we'll need to fix that.
// for the sake of Wizard, we can load everything at once, since the game is so small
export default class ResourceCache {
    constructor(size, file) {
        /*
        this.lru = []; // least recently used resource handle list. the idea is that the last used resource
                       // is pushed to the beginning of the list, so that way you know the order in which
                       // resources were last used.

        this.resources = {}; // map of all resources for fast lookup. I think it's supposed to be keyed off
                             // of GetPattern, but why is that method on the resource-loader?

        this.resourceLoaders = []; // list of all resource loaders (why is this a list?)

        this.file; // object that implements IResourceFile
        this.cacheSize; // total memory size
        this.allocated; // total memory allocated
        */
    }

    // protected
    find(resource) {
        // use this.resources to locate the right handle based on the given resource
        // TODO: what the hell is the difference between a resource and a handle?
    }

    update(handle) {
        // remove handle from the lru and promote it to the front
    }

    load(resource) {
        let loader, handle;

        // find the right resource loader for the given resource.
        // you know if it's the right resource loader if the loader's pattern
        // matches the filename (TODO: implement wildcard match)
        loader = this.resourceLoaders.find(function (l) {
            if (wildcardMatch(l.getPattern(), resource.name)) {
                return l;
            }
        });

        // error out if we couldn't do that
        if (!loader) {
            console.error('ResourceCache.load: default resource loader not found!');
            return handle;
        }

        handle = new ResourceHandle(resource, this);

        if (!loader.useRawFile() && loader.loadResource(handle)) {
            console.error('ResourceCache.load: could not load resource. returning empty resource handle');

            return new ResourceHandle();
        }

        if (handle) {
            this.lru.shift(handle);
            this.resources[resource.name] = handle;
        }

        return handle;
    }

    free (handle) {
        // find a resource given its handle and remove it from the rescache
    }

    makeRoom(size) { }
    allocate(size) { }
    freeOneResource() { }
    memoryHasBeenFreed(size) { }

    // public
    init() {
        let ret = false;

        // "open" this.file
        // if this.file could be opened:
            this.registerLoader(new DefaultResourceLoader());
            ret = true;
        
        return ret;
    }

    registerLoader(loader) {
        this.resourceLoaders.push(loader);
    }

    getHandle(resource) {
        let handle = this.find(resource);

        if (!handle) {
            handle = this.load(resource);
        } else {
            this.update(handle);
        }

        return handle;
    }

    preload(pattern, progressCallback) { } // progressCallback gets an int and a bool as args
    flush() { }

    destroy() {
        while (this.lru.length) {
            this.freeOneResource();
        }
    }
}
