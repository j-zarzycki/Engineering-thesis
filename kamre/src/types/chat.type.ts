type ChatType = {
  answers: string[];
  questions: string[];
  is_activity: boolean;
};

type ChatResponseType = {
  res: ChatType;
};

export type { ChatResponseType, ChatType };
