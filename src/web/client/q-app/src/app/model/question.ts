
export interface QuestionItems extends Array<Question>{};

export interface Question {
  TestoDomanda: string;
  Risposte: Risposta[] ;

}

export interface RispostaItems extends Array<Risposta>{}

export interface Risposta {
  Corretta : boolean;
  Text: string;
}

