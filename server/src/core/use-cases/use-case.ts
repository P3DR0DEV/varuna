export abstract class UseCase {
  abstract execute(...args: unknown[]): unknown
}
