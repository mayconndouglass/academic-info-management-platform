export class NoResultsFoundError extends Error {
  constructor() {
    super("No results found for the given search term")
  }
}
