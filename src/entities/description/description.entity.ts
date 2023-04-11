import { Either, left, right } from '../../shared/either';
import { InvalidDescriptionError } from '../expense/expense.errors';

export class Description {
  private _text: string;

  constructor(text: string) {
    this._text = text;
  }

  public static validate(
    text: string
  ): Either<InvalidDescriptionError, Description> {
    const MAX_DESCRIPTION_CHARACTERS = 191;
    if (text.length > MAX_DESCRIPTION_CHARACTERS)
      return left(new InvalidDescriptionError());

    return right(new Description(text));
  }

  public get text() {
    return this._text;
  }
}
