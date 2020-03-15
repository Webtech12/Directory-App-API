class HelperClass {
    constructor() {
        console.log('class instantiated')
    }

    // static method for url
    static staticMethodURL() {
        return '/api/v1';
    }
}

module.exports = HelperClass.staticMethodURL()

