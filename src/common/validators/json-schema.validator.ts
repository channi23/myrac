import { ErrorObject } from 'ajv';
import { ajv } from '../../schemas/schema.registry';

type ValidationResult = {
  valid: boolean;
  errors: ErrorObject[] | null | undefined;
};

export function validateBySchemaId(schemaId: string, data: unknown): ValidationResult {
  const validate = ajv.getSchema(schemaId);

  if (!validate) {
    throw new Error(`Schema not found: ${schemaId}`);
  }

  const validationResult = validate(data);

  if (validationResult instanceof Promise) {
    throw new Error(`Async schema validation is not supported for schema: ${schemaId}`);
  }

  return {
    valid: validationResult,
    errors: validate.errors,
  };
}

export function formatAjvErrors(errors: ErrorObject[] | null | undefined): string[] {
  if (!errors?.length) {
    return [];
  }

  return errors.map((error) => {
    const path = error.instancePath || '/';
    return `${path} ${error.message ?? 'is invalid'}`.trim();
  });
}
