
export const createLogSchema = {
    $id : 'CreateLog',
    type:'object',
    required:['content'],
    properties:{
        content:{
            type:'string',
            minLength:1,
        },
    },
    additionalProperties:false,
};

export const updateLogSchema = {
    $id : 'UpdateLog',
    type:'object',
    properties:{
        content:{
            type:'string',
            minLength:1,
        },
    },
    additionalProperties:false,
    minProperties:1,
};