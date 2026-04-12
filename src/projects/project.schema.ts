
export const createProjectSchema={
    $id: 'CreateProject',
    type: 'object',
    required:['title','status'],
    properties:{
        title:{
            type:'string',
            minLength:1,
        },
        status:{
            type:'string',
            enum:['idea','building','deployed','paused'],
        },
    },
    additionalProperties:false,
};

export const updateProjectSchema={
    $id:'UpdateProject',
    type:'object',
    properties:{
        title:{
            type:'string',
            minLength:1,
        },
        status:{
            type:'string',
            enum:['idea','building','deployed','paused'],
        },
    },
    additionalProperties:false,
    minProperties:1,
};