/** CharacterMVC model definitions **/

export interface CharacterModel {
  id?: number;
  name: string;
  age: number;
  comment?: string;
  [key: string]: any;
}

export namespace CharacterModel {
  export enum Filter {}
}
