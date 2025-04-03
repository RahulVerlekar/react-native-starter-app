import { FrameworkModel } from '../domain/models/framework.model';
import { JournalEntryModel } from '../domain/models/journal-entry.model';
import { QuestionModel } from '../domain/models/question.model';
import { SessionModel } from '../domain/models/session.model';
import { UserModel } from '../domain/models/user.model';
import { BaseNetworkRepo } from './BaseNetworkRepo';

export class FlowApiClient extends BaseNetworkRepo {
  constructor(baseURL: string = 'https://specifics.fyi') {
    super(baseURL);
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ accessToken: string; user: UserModel }> {
    return this.post<{ accessToken: string; user: UserModel }>('/users/login', { email, password });
  }

  async register(email: string, phoneNumber: string, password: string): Promise<{ userId: number }> {
    return this.post<{ userId: number }>('/users/create', { email, phoneNumber, password });
  }

  // User endpoints
  async getCurrentUser(): Promise<UserModel> {
    return this.get<UserModel>('/users/me');
  }

  async getUserById(id: number): Promise<UserModel> {
    return this.get<UserModel>(`/users/${id}`);
  }

  async updateUser(id: number, userData: Partial<UserModel>): Promise<UserModel> {
    return this.patch<UserModel>(`/users/${id}`, userData);
  }

  // Session endpoints
  async getUserSessions(): Promise<SessionModel[]> {
    return this.get<SessionModel[]>('/sessions').then((sessions) => {
      return sessions.reverse();
    });
  }

  async startNewSession(framework: string): Promise<{ session: SessionModel, entries: JournalEntryModel[] }> {
    return this.get<{ session: SessionModel, entries: JournalEntryModel[] }>('/sessions/start?framework=' + framework);
  }

  async endSession(sessionId: string): Promise<SessionModel> {
    return this.get<SessionModel>(`/sessions/${sessionId}/end`);
  }

  async getNextQuestion(sessionId: string): Promise<{ session: SessionModel, entries: JournalEntryModel[] }> {
    return this.get<{ session: SessionModel, entries: JournalEntryModel[] }>(`/sessions/${sessionId}/next-question`);
  }

  async addAnswer(sessionId: string, entryId: string, answer: string): Promise<JournalEntryModel> {
    return this.post<JournalEntryModel>(`/sessions/${sessionId}/add-answer/${entryId}`, { answer });
  }

  async getSessionEntries(sessionId: string): Promise<JournalEntryModel[]> {
    return this.get<JournalEntryModel[]>(`/sessions/${sessionId}/entries`);
  }

  async getSessionDetails(sessionId: string): Promise<{ session: SessionModel, entries: JournalEntryModel[] }> {
    return this.get<{ session: SessionModel, entries: JournalEntryModel[] }>(`/sessions/${sessionId}/details`);
  }

  async getLastEntries(): Promise<Array<{ sessionId: string, lastEntry: JournalEntryModel }>> {
    return this.get<Array<{ sessionId: string, lastEntry: JournalEntryModel }>>('/sessions/last-entries');
  }

  // Question endpoints
  async getAllQuestions(): Promise<QuestionModel[]> {
    return this.get<QuestionModel[]>('/questions');
  }

  async getQuestionsWithFrameworks(): Promise<QuestionModel[]> {
    return this.get<QuestionModel[]>('/questions/with-frameworks');
  }

  async createQuestion(question: string, hint: string): Promise<QuestionModel> {
    return this.post<QuestionModel>('/questions', { question, hint });
  }

  // Framework endpoints
  async getAllFrameworks(): Promise<FrameworkModel[]> {
    return this.get<FrameworkModel[]>('/frameworks');
  }

  async getFrameworksWithQuestions(): Promise<FrameworkModel[]> {
    return this.get<FrameworkModel[]>('/frameworks/with-questions');
  }

  async createFramework(title: string, description: string): Promise<FrameworkModel> {
    return this.post<FrameworkModel>('/frameworks', { title, description });
  }

}