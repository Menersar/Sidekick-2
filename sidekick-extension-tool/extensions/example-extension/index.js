const {api, type, Extension} = require('scratch-extension');
class ExampleExtension extends Extension {
    onInit() {
        api.addCategory({
            categoryId: 'author.exampleid.category',
            messageId: 'author.exampleid.category',
            color: '#339900'
        });
        api.addBlock({
            opcode: 'author.exampleid.return',
            type: type.BlockType.REPORTER,
            messageId: 'author.exampleid.return',
            categoryId: 'author.exampleid.category',
            param: {
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: 'Hello World!'
                }
            },
            function: args => this.ReturnValue(args.VALUE)
        });
        api.addBlock({
            opcode: 'author.exampleid.helloworld',
            type: type.BlockType.COMMAND,
            messageId: 'author.exampleid.helloworld',
            categoryId: 'author.exampleid.category',
            function: args => this.HelloWorld()
        });
    }
    onUninit() {
        api.removeCategory('author.exampleid.category');
    }
    ReturnValue(VALUE) {
        return VALUE;
    }
    HelloWorld() {
        console.log("Hello World!");
        alert("Hello World!");
    }
}
module.exports = ExampleExtension;