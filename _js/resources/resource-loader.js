export default class ResourceLoader {
    getPattern() { }

    // returns true if absolutely no processing needs to be done on the resource file
    useRawFile() { }

    getLoadedResourceSize(rawBuffer, rawSize) { }
    loadResource(rawBuffer, rawSize, handle) { }
}
