export interface Documentation {
    id?:number,
    created_at?:string,
    title:string,
    description:string,
    user_id?:string,
    lang:number,
}

export interface Language {
    id?:number,
    created_at?:string,
    title:string,
    description:string,
}

export interface Contents {
    id?:number,
    created_at?:string,
    number:number,
    text:string,
    connect:number,
    is_code:boolean,
    user_id?:string,
}

export interface Comments {
    id?:number,
    created_at?:string,
    number:number,
    text:string,
    cmntof:number,
}