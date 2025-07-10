export class MeiliTaskFailedError extends Error {
  constructor() {
    super("Failed to fetch pageFailed to enqueue MeiliSearch indexing task")
  }
}
