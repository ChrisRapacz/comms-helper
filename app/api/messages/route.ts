import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Message, Email } from '@/lib/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'messages.json');

interface DataStructure {
  messages: Message[];
  emails: Record<string, Email[]>;
}

// GET - Read all messages and emails
export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading messages:', error);
    // If file doesn't exist, return empty data
    return NextResponse.json({ messages: [], emails: {} });
  }
}

// POST - Save message and send to all employees
export async function POST(request: NextRequest) {
  try {
    const { message, employees } = await request.json();

    // Read current data
    let data: DataStructure = { messages: [], emails: {} };
    try {
      const fileData = await fs.readFile(DATA_FILE, 'utf-8');
      data = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist yet, use empty data
    }

    // Add message
    data.messages.push(message);

    // Create emails for each employee
    employees.forEach((employee: any) => {
      const variantContent = message.variants[employee.preferredVariant] || message.baseContent;

      // Add AI disclaimer
      const disclaimer = `

---

<div style="background: #f3f4f6; border-left: 4px solid #6366f1; padding: 12px; margin-top: 24px; font-size: 13px; color: #4b5563;">
  <p style="margin: 0 0 8px 0;"><strong>🤖 Ta wiadomość została automatycznie dopasowana do Twoich preferencji komunikacyjnych</strong></p>
  <p style="margin: 0;">
    <a href="#view-original-${message.id}" style="color: #6366f1; text-decoration: none;">📄 Zobacz oryginalną wersję wiadomości</a> |
    <a href="#change-preferences" style="color: #6366f1; text-decoration: none;">⚙️ Zmień swoje preferencje</a>
  </p>
</div>`;

      const bodyWithDisclaimer = variantContent + disclaimer;

      const email: Email = {
        id: `${message.id}-${employee.id}`,
        from: 'admin@company.com',
        fromName: 'Komunikator Firmowy',
        subject: message.subject,
        body: bodyWithDisclaimer,
        timestamp: new Date(),
        read: false,
        variant: employee.preferredVariant,
        isDemo: false,
        originalContent: message.baseContent,
        messageId: message.id,
      };

      if (!data.emails[employee.id]) {
        data.emails[employee.id] = [];
      }
      data.emails[employee.id].unshift(email);
    });

    // Write updated data - serialize dates to ISO strings
    const dataToSave = {
      messages: data.messages,
      emails: Object.keys(data.emails).reduce((acc, key) => {
        acc[key] = data.emails[key].map(email => ({
          ...email,
          timestamp: email.timestamp instanceof Date ? email.timestamp.toISOString() : email.timestamp,
        }));
        return acc;
      }, {} as Record<string, any[]>),
    };

    await fs.writeFile(DATA_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to save message' },
      { status: 500 }
    );
  }
}
