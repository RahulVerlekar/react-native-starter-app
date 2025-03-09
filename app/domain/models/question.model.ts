import { BaseModel } from "./common/base.model";
import { FrameworkQuestionModel } from "./framework-question.model";
import { JournalEntryModel } from "./journal-entry.model";

export class QuestionModel extends BaseModel {
    id: string;
    question: string;
    hint: string;
    frameworkQuestions?: FrameworkQuestionModel[];
    journalEntries?: JournalEntryModel[];
}
