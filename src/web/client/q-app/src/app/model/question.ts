
export interface QuestionItems extends Array<Question>{};

export interface Question {
  TestoDomanda: string;
  Risposte: Risposta[] ;
  id: number;
  profile: Profile;
}

export interface Profile {
  ok:number;
  nok:number;
}

export interface RispostaItems extends Array<Risposta>{}

export interface Risposta {
  Corretta : boolean;
  Text: string;

}

