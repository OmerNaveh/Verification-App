export type User = {userName:string, password:string, secret?:string};

export const isString= (param:unknown):param is string=>{
    return typeof(param)==='string' || param instanceof String;
}