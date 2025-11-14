import { create } from 'zustand';
import { InboxState, Employee, Message, Email } from './types';
import { EMPLOYEES } from './personas';
import { getInitialEmailsForEmployee } from './sample-emails';

export const useInboxStore = create<InboxState>((set, get) => {
  // Initialize emails for all employees
  const initialEmails: Record<string, Email[]> = {};
  EMPLOYEES.forEach(emp => {
    initialEmails[emp.id] = getInitialEmailsForEmployee(emp.id);
  });

  return {
    employees: EMPLOYEES,
    messages: [],
    emails: initialEmails,
    currentEmployee: null,

    setCurrentEmployee: (employee) => set({ currentEmployee: employee }),

    addMessage: (message) => set((state) => ({
      messages: [...state.messages, message],
    })),

    sendMessage: (messageId) => set((state) => {
      const message = state.messages.find(m => m.id === messageId);
      if (!message) return state;

      // Create emails for each employee with their preferred variant
      const newEmails = { ...state.emails };

      state.employees.forEach(employee => {
        const variantContent = message.variants[employee.preferredVariant] || message.baseContent;

        const email: Email = {
          id: `${messageId}-${employee.id}`,
          from: 'admin@company.com',
          fromName: 'Komunikator Firmowy',
          subject: message.subject,
          body: variantContent,
          timestamp: new Date(),
          read: false,
          variant: employee.preferredVariant,
          isDemo: false,
        };

        newEmails[employee.id] = [email, ...(newEmails[employee.id] || [])];
      });

      return {
        messages: state.messages.map(m =>
          m.id === messageId ? { ...m, sent: true } : m
        ),
        emails: newEmails,
      };
    }),

    getEmployeeEmails: (employeeId) => {
      return get().emails[employeeId] || [];
    },

    markEmailAsRead: (employeeId, emailId) => set((state) => {
      const employeeEmails = state.emails[employeeId] || [];
      const updatedEmails = employeeEmails.map(email =>
        email.id === emailId ? { ...email, read: true } : email
      );

      return {
        emails: {
          ...state.emails,
          [employeeId]: updatedEmails,
        },
      };
    }),
  };
});
