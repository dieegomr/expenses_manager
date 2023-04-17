import { Description } from './description.entity';

describe('Description Tests', () => {
  it('should return an error if description length is longer then 191 characters', function () {
    const STRING_192_CHARACTERS =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus..';
    const descriptionOrError = Description.validate(STRING_192_CHARACTERS);
    const error = descriptionOrError.value as Error;

    expect(descriptionOrError.isLeft()).toBe(true);
    expect(error.message).toStrictEqual(
      'An description must have a maximum of 191 character',
    );
  });

  it('should return an description if a valid description is provided', function () {
    const STRING_191_CHARACTERS =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';
    const descriptionOrError = Description.validate(STRING_191_CHARACTERS);
    const description = descriptionOrError.value as Description;

    expect(description.value).toStrictEqual(STRING_191_CHARACTERS);
  });
});
