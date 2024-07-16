import { BaseError } from '../base.error';

export class LinkDoesNotExist extends BaseError {
  static CODE = `LINK_DOES_NOT_EXIST`;
  static MESSAGE = `Link does not exist`;

  constructor() {
    super(LinkDoesNotExist.MESSAGE, LinkDoesNotExist.CODE);
  }
}
