export interface Documentation {
    id?:number,
    created_at?:string,
    title:string,
    description:string,
    user_id?:string,
}

export interface Language {
    id?:number,
    created_at?:string,
    language_name:string,
    description:string,
}