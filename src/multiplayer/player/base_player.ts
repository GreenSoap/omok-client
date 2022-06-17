export default class BasePlayer {
  constructor(
    public readonly name: string,
    public readonly type: 'ai' | 'local'
  ) { }
}