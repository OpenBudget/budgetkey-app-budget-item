export class Question {
  text: string = '';
  query: string = '';
  parameters: object = {};
}

export class PreparedQuestionTextFragment {
  isText: boolean = false;
  isParameter: boolean = false;
  value: string = '';
}

export class PreparedQuestionParameterFragment {
  isText: boolean = false;
  isParameter: boolean = false;
  name: string = '';
  value: string = '';
  values: object = {};
}

export type PreparedQuestionFragment = PreparedQuestionTextFragment | PreparedQuestionParameterFragment;
export type PreparedQuestionFragments = PreparedQuestionFragment[];

export class PreparedQuestion extends Question {
  parsed: PreparedQuestionFragments = [];
  defaults: object = {};  // key-value pairs of default values for each parameter
}

export type Questions = Question[];
export type PreparedQuestions = PreparedQuestion[];

export class Descriptor {
  pathPrefix: string = '';
  titleTemplate: string = '';
  subtitleTemplate: string = '';
  textTemplate: string = '';
  questions: Questions = [];
}
