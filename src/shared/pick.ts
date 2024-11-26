const pickFields = <T extends Record<string, unknown> ,K extends keyof T>(obj: T, keys: K[]) => {
    //  console.log(obj, keys)
     const finelObj: Partial<T> = {};

     for(const key of keys){
        if(obj && Object.hasOwnProperty.call(obj, key)){
            finelObj[key] = obj[key]
        }
     }

    //  console.log({finelObj})
     return finelObj;
}

export default pickFields;