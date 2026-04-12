export const createPostSchema={
    $id:'CreatePost',
    type:'object',
    required:['title','content'],
    properties:{
        title:{
            type:'string',
            minLength:1,
        },
        content:{
            type:'string',
            minLength:1,
        },
    },
    additionalProperties:false,
};

export const updatePostSchema={
    $id:'UpdatePost',
    type:'object',
    properties:{
        title:{
            type:'string',
            minLength:1,
        },
        content:{
            type:'string',
            minLength:1,
        },
    },
    additionalProperties:false,
    minProperties:1,
};