export interface Documentation {
    id?:number,
    created_at?:string,
    title:string,
    description:string,
    user_id?:string,
    lang:number,
    upvotes:number,
}

export interface Language {
    id?:number,
    created_at?:string,
    title:string,
    description:string,
}

export interface Contents {
    is_toc?: boolean;
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

export interface Users {
    id?:number,
    created_at?:string,
    user_name:string,
    user_id:string,
    points:number,
}