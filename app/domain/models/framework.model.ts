import { BaseModel } from "./common/base.model";
import { FrameworkQuestionModel } from "./framework-question.model";

export class FrameworkModel extends BaseModel {
    id: string;
    title: string;
    description: string;
    questions?: FrameworkQuestionModel[];
}
