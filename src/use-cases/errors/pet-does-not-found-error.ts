export class PetDoesNotFoundError extends Error {
  constructor() {
    super('Pet does not found')
  }
}
