// page 222
// TODO: most of these methods most likely wont be needed, but the idea is to have
// a class that is responsible for doing HTTP gets to get game resources.
export default class ResourceFile {
    constructor () { }

    // get (open) the resource file and return success/fail on whether or not it could be opened
    get() { }

    // return the size of the resource based on the name of the resource
    getRawResourceSize(resource) { }

    // read the resource from the file into the buffer
    getRawResource(resource, buffer) { }

    // tell you how many resources are in the file
    getNumResources() { }

    // tell you the name of the nth resource
    getResourceName(num) { }
}
