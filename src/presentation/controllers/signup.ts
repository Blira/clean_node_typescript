import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/missingParamError';
import { badRequest, serverError } from '../helpers/httpHelper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/emailValidator';
import { InvalidParamError } from '../errors/InvalidParamError';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const validEmail = this.emailValidator.isValid(httpRequest.body.email);

      if (!validEmail) {
        return {
          statusCode: 400,
          body: new InvalidParamError('email'),
        };
      }
    } catch (_error) {
      return serverError();
    }
  }
}
