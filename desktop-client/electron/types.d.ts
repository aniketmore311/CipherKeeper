
export interface electronAPI {
    ping: () => Promise<String>
    getState: (key: string) => Promise<any>
    setState: (key: string, val: any) => Promise<void>
}