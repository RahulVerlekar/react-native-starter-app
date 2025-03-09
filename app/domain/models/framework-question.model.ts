import { BaseModel } from "./common/base.model";
import { FrameworkModel } from "./framework.model";
import { QuestionModel } from "./question.model";

export class FrameworkQuestionModel extends BaseModel {
    id: string;
    order: number;
    question?: QuestionModel;
    framework?: FrameworkModel;
}
