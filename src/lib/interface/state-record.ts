export interface IStateRecord {
  [key: string]: { value: string; onChange: (_: unknown) => void };
}
