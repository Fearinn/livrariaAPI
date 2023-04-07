import BadRequest from "./BadRequest.js";

class BadValidation extends BadRequest {
  constructor() {
    super("No item was found");
  }
}

export default BadValidation;
