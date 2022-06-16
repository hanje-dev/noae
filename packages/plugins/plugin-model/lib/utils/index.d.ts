export declare type ModelItem = {
    absPath: string;
    namespace: string;
    exportName?: string;
} | string;
export declare const getName: (absPath: string, absSrcPath: string) => string;
export declare const getPath: (absPath: string) => string;
export declare const genImports: (imports: string[]) => string;
export declare const genExtraModels: (models: ModelItem[] | undefined, absSrcPath: string) => ({
    importPath: string;
    importName: string;
    namespace: string;
    exportName?: undefined;
} | {
    importPath: string;
    importName: string;
    namespace: string;
    exportName: string | undefined;
})[];
declare type HookItem = {
    namespace: string;
    use: string[];
};
export declare const sort: (ns: HookItem[]) => string[];
export declare const genModels: (imports: string[], absSrcPath: string) => {
    namespace: string;
    use: string[];
    importName: string;
}[];
export declare const isValidHook: (filePath: string) => boolean;
export declare const getValidFiles: (files: string[], modelsDir: string) => string[];
export {};
