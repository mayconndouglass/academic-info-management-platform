export class FetchPageError extends Error {
  constructor() {
    super("Failed to fetch page")
  }
}
