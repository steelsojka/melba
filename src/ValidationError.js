export default class ValidationError extends Error {
  message: string;
  state: ValidationState;

  constructor(message: string, state: ValidationState) {
    Object.assign(this, { message, state });
  }
}
