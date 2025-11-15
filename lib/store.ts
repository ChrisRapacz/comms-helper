import { create } from 'zustand';
import { InboxState, Employee, Message, Email } from './types';
import { EMPLOYEES } from './personas';
import { getInitialEmailsForEmployee } from './sample-emails';

export const useInboxStore = create<InboxState>((set, get) => {
  // Initialize emails for all employees (demo data only)
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

    // Fetch data from server
    fetchData: async () => {
      try {
        const response = await fetch('/api/messages');
        if (!response.ok) throw new Error('Failed to fetch messages');

        const data = await response.json();

        // Merge server data with demo emails, avoiding duplicates
        const mergedEmails = { ...get().emails };
        Object.keys(data.emails || {}).forEach(employeeId => {
          const serverEmails = data.emails[employeeId].map((email: any) => ({
            ...email,
            timestamp: new Date(email.timestamp),
          }));

          const existingEmails = mergedEmails[employeeId] || [];
          const existingIds = new Set(existingEmails.map(e => e.id));

          // Only add emails that don't already exist
          const newEmails = serverEmails.filter((email: Email) => !existingIds.has(email.id));

          // Prepend new server emails to existing emails
          mergedEmails[employeeId] = [...newEmails, ...existingEmails];
        });

        set({
          messages: data.messages || [],
          emails: mergedEmails,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    sendMessage: async (messageId) => {
      const message = get().messages.find(m => m.id === messageId);
      if (!message) return;

      try {
        // Send to server
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            employees: get().employees,
          }),
        });

        if (!response.ok) throw new Error('Failed to send message');

        // Mark as sent locally
        set((state) => ({
          messages: state.messages.map(m =>
            m.id === messageId ? { ...m, sent: true } : m
          ),
        }));

        // Refresh data from server
        await get().fetchData();
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    },

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
