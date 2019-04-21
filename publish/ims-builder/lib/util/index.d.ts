import ts from 'typescript';
export * from './isDecorator';
export * from './hasDecorator';
export declare function createSourceFile(path: string): ts.SourceFile;
export interface NodeFilter<T extends ts.Node> {
    (node: ts.Node): node is T;
}
export declare function getChildNode<T extends ts.Node>(node: ts.Node, filter: NodeFilter<T>): T;
export declare function createVisitorFromPath(filePath: string): <T extends ts.Node>(visitor: (node: ts.Node) => T) => {
    ast: T;
    code: string;
};
export declare function printList<T extends ts.Node>(node: ts.NodeArray<T>): string;
export declare function printNode<T extends ts.Node>(node: T): string;
export declare function createNodeArray(nodes: ts.Node[]): ts.NodeArray<any>;
