import { Email } from './types';

export const SAMPLE_EMAILS: Email[] = [
  {
    id: 'sample-1',
    from: 'hr@company.com',
    fromName: 'Dział HR',
    subject: 'Przypomnienie: Oceny roczne - deadline 15 listopada',
    body: 'Szanowni Państwo,\n\nPrzypominamy, że termin na uzupełnienie formularzy ocen rocznych upływa 15 listopada. Prosimy o terminowe wypełnienie dokumentacji.\n\nZ poważaniem,\nDział HR',
    timestamp: new Date('2024-11-10T09:00:00'),
    read: true,
    isDemo: true,
  },
  {
    id: 'sample-2',
    from: 'it@company.com',
    fromName: 'IT Support',
    subject: 'Planowana przerwa techniczna - 14.11, 23:00-01:00',
    body: 'Witam,\n\nInformujemy o planowanej przerwie technicznej w środę 14 listopada w godzinach 23:00-01:00. W tym czasie systemy mogą być niedostępne.\n\nIT Support',
    timestamp: new Date('2024-11-11T14:30:00'),
    read: false,
    isDemo: true,
  },
  {
    id: 'sample-3',
    from: 'ceo@company.com',
    fromName: 'Jan Kowalski, CEO',
    subject: 'Wyniki Q3 - gratulacje dla całego zespołu!',
    body: 'Drodzy Wszyscy,\n\nMam przyjemność poinformować, że osiągnęliśmy najlepsze wyniki w historii firmy! Q3 zamknęliśmy 15% powyżej planu. To efekt Waszej ciężkiej pracy.\n\nSpotkajmy się w piątek na lunch celebracyjny.\n\nJan',
    timestamp: new Date('2024-11-08T16:00:00'),
    read: true,
    isDemo: true,
  },
  {
    id: 'sample-4',
    from: 'facilities@company.com',
    fromName: 'Administracja',
    subject: 'Nowe zasady parkingu od grudnia',
    body: 'Informujemy o zmianach w zasadach korzystania z parkingu firmowego, które wchodzą w życie od 1 grudnia:\n\n- Nowy system rezerwacji miejsc\n- Miejsca premium dla aut elektrycznych\n- Dedykowane miejsca dla gości\n\nSzczegóły wkrótce na intranecie.',
    timestamp: new Date('2024-11-09T11:15:00'),
    read: false,
    isDemo: true,
  },
  {
    id: 'sample-5',
    from: 'marketing@company.com',
    fromName: 'Zespół Marketing',
    subject: 'Konkurs na logo firmowego newslettera',
    body: 'Hej! 🎨\n\nOgłaszamy konkurs na najlepsze logo dla naszego newslettera. Nagroda: 500 zł i publikacja nazwiska.\n\nZgłoszenia do 20 listopada na: marketing@company.com\n\nCzekamy na Wasze projekty!',
    timestamp: new Date('2024-11-07T10:00:00'),
    read: true,
    isDemo: true,
  },
];

// Generate initial inbox for each employee with sample emails
export function getInitialEmailsForEmployee(employeeId: string): Email[] {
  // Return 3-5 random sample emails for each employee
  const numEmails = 3 + Math.floor(Math.random() * 3);
  return SAMPLE_EMAILS
    .slice(0, numEmails)
    .map((email, index) => ({
      ...email,
      id: `${employeeId}-${email.id}-${index}`,
      read: Math.random() > 0.5,
    }));
}
