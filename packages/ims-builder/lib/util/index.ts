import ts from 'typescript';
export * from './isDecorator';
export * from './hasDecorator';
import fs from 'fs-extra';
export function createSourceFile(path: string): ts.SourceFile {
    let code = path;
    if (fs.existsSync(path)) {
        code = fs.readFileSync(path).toString('utf8');
    }
    let kind: ts.ScriptKind = ts.ScriptKind.Unknown;
    if (path.endsWith('.tsx')) {
        kind = ts.ScriptKind.TSX;
    } else if (path.endsWith('.jsx')) {
        kind = ts.ScriptKind.JSX;
    } else if (path.endsWith('.json')) {
        kind = ts.ScriptKind.JSON;
    } else if (path.endsWith('.js')) {
        kind = ts.ScriptKind.JS;
    } else if (path.endsWith('.ts')) {
        kind = ts.ScriptKind.TS;
    }
    return ts.createSourceFile(path, code, ts.ScriptTarget.Latest, true, kind);
}
export interface NodeFilter<T extends ts.Node> {
    (node: ts.Node): node is T;
}
export function getChildNode<T extends ts.Node>(node: ts.Node, filter: NodeFilter<T>): T {
    const visitor = (node: ts.Node) => {
        if (filter(node)) return node;
        return node.forEachChild(visitor, visitors)
    }
    const visitors = (nodes) => {
        for (let node of nodes) {
            const res = visitor(node);
            if (!!res) return res;
        }
    }
    return node.forEachChild(visitor, visitors);
}

export function createVisitorFromPath(filePath: string) {
    return <T extends ts.Node>(visitor: (node: ts.Node) => T): {
        ast: T;
        code: string;
    } => {
        const sourceFile = createSourceFile(filePath);
        const node = sourceFile.forEachChild<T>(visitor, (nodes) => {
            for (let node of nodes) {
                const res = visitor(node);
                if (res) return res;
            }
        });
        return {
            ast: node,
            code: printList(ts.createNodeArray([node]))
        }
    }
}

export function printList<T extends ts.Node>(node: ts.NodeArray<T>): string {
    const sourceFile = createSourceFile(``);
    const printer = ts.createPrinter()
    return printer.printList(ts.ListFormat.AllowTrailingComma, node, sourceFile)
}

export function printNode<T extends ts.Node>(node: T): string {
    return printList(ts.createNodeArray([node]))
}


export function createNodeArray(nodes: ts.Node[]) {
    const members = [];
    nodes.map(node => {
        // 去掉无用的node
        if (!!node) members.push(node)
    })
    return ts.createNodeArray(members);
}
