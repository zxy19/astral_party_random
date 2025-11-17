declare global {
    
    const chars: Char[]

    
}
declare module Types{
    type Char = {
        "icon": string
        "name": string
        "color": number
        "related": string[]
    }
}