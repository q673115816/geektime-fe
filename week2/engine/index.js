export default class Template {
    render(tmpl, options) {
        console.log(tmpl);
        const RegStartTag = /^<((?:[a-zA-Z_][\w\-\.]*\:)?[a-zA-Z_][\w\-\.]*)/m
        const RegAttr = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/m
        const startTag = tmpl.match(RegStartTag)
        const attr = tmpl.match(RegAttr)
        console.log(startTag);
        console.log(attr);
    }
}