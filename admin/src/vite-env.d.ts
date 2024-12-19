
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

interface ImportMetaEnv {
    readonly BASE_URL: string;
    // add other environment variables here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}