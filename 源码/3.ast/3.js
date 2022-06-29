const core = require('@babel/core');
const types = require('@babel/types');
let transformClassPlugin = {
    visitor: {
        ClassDeclaration(nodePath) {
            const { node } = nodePath;
            const id = node.id;//Identifier Person
            const classMethods = node.body.body;
            let nodes = [];
            classMethods.forEach(method => {
                if (method.kind === 'constructor') {
                    const constructorFunction = types.functionDeclaration(id, method.params, method.body, method.generator, method.async);
                    nodes.push(constructorFunction);
                } else {
                    const left = types.memberExpression(
                        types.memberExpression(id, types.identifier('prototype'))
                        , method.key);//Person.prototype.getName=
                    const right = types.functionExpression(null, method.params, method.body, method.generator, method.async);
                    const assignmentExpression = types.assignmentExpression('=', left, right);
                    nodes.push(assignmentExpression);
                }
            });
            //原来此路径上放的是一个类的节点，现在替换成了多个节点
            nodePath.replaceWithMultiple(nodes);
        }
    }
}

const sourceCode = `
class Person{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}
`;
let targetSource = core.transform(sourceCode, {
    plugins:[transformClassPlugin]
});
console.log(targetSource.code);

/* function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    return this.name;
} */