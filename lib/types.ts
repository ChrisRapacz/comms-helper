export type MessageVariant =
  | 'base'
  | 'subsections'
  | 'detailed'
  | 'short'
  | 'bullets'
  | 'tldr-first'
  | 'action-oriented'
  | 'faq'
  | 'visual'
  | 'formal'
  | 'casual'
  | 'data-driven'
  | 'english'
  | 'staropolski'
  | 'super-casual';

export interface MessageVariantConfig {
  id: MessageVariant;
  name: string;
  description: string;
  icon: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  persona: string;
  description: string;
  avatarUrl: string;
  preferredVariant: MessageVariant;
  generation: 'Boomer' | 'Gen X' | 'Millennial' | 'Gen Z';
}

export interface Email {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
  variant?: MessageVariant;
  isDemo?: boolean;
  originalContent?: string; // Original base message content
  messageId?: string; // Reference to the Message that created this email
}

export interface Message {
  id: string;
  subject: string;
  keyPoints: string;
  baseContent: string;
  variants: Record<MessageVariant, string>;
  timestamp: Date;
  sent: boolean;
}

export interface InboxState {
  employees: Employee[];
  messages: Message[];
  emails: Record<string, Email[]>; // employeeId -> emails
  currentEmployee: Employee | null;
  setCurrentEmployee: (employee: Employee | null) => void;
  addMessage: (message: Message) => void;
  fetchData: () => Promise<void>;
  sendMessage: (messageId: string) => Promise<void>;
  deleteAllMessages: () => Promise<void>;
  getEmployeeEmails: (employeeId: string) => Email[];
  markEmailAsRead: (employeeId: string, emailId: string) => void;
}
