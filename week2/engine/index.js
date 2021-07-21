export default class Template {
    constructor(options) {
        this.el = document.querySelector(options.el || 'body')
        this.template = options.render

        console.log();
        const RegStartTag = /^<((?:[a-zA-Z_][\w\-\.]*\:)?[a-zA-Z_][\w\-\.]*)/m
        const RegAttr = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/m

        const startTag = this.template.match(RegStartTag)[1]
        const attr = this.template.match(RegAttr)
        console.log(startTag);
        console.log(attr);
        this.root = new vnode(startTag, attr)
        this.el.append(this.root)
    }
    render(tmpl, options) {
    }


}

class vnode {
    constructor(tag, attr) {
        const ele = document.createElement(tag)
        Object.entries(attr).map(([key, value]) => {
            ele.setAttrible(key, value)
        })
    }
}