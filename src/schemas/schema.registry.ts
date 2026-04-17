import Ajv from "ajv";
import addFormats from "ajv-formats";

import { createProjectSchema, updateProjectSchema } from '../projects/project.schema';
import { createLogSchema, updateLogSchema } from '../logs/logs.schema';
import { createPostSchema, updatePostSchema } from '../posts/posts.schema';

const ajv = new Ajv({
    allErrors:true,
    strict:false,
});

addFormats(ajv);

ajv.addSchema(createProjectSchema);
ajv.addSchema(updateProjectSchema);
ajv.addSchema(createLogSchema);
ajv.addSchema(updateLogSchema);
ajv.addSchema(createPostSchema);
ajv.addSchema(updatePostSchema);

export {ajv};
