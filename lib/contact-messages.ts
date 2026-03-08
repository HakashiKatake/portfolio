import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";

export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessageRecord extends ContactMessageInput {
  _id: ObjectId;
  status: "new" | "read";
  createdAt: Date;
  source: string;
  userAgent?: string;
  ip?: string;
}

function clean(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function validateContactMessage(input: ContactMessageInput): { valid: true } | { valid: false; error: string } {
  const name = clean(input.name);
  const email = clean(input.email).toLowerCase();
  const message = input.message.trim();

  if (!name || !email || !message) {
    return { valid: false, error: "All fields are required." };
  }

  if (name.length < 2 || name.length > 80) {
    return { valid: false, error: "Name should be between 2 and 80 characters." };
  }

  if (email.length > 140 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: "Please provide a valid email address." };
  }

  if (message.length < 10 || message.length > 4000) {
    return { valid: false, error: "Message should be between 10 and 4000 characters." };
  }

  return { valid: true };
}

export async function createContactMessage(
  input: ContactMessageInput,
  metadata?: { source?: string; userAgent?: string; ip?: string },
) {
  const db = await getMongoDb();
  const collection = db.collection<ContactMessageRecord>("contact_messages");

  const doc: Omit<ContactMessageRecord, "_id"> = {
    name: clean(input.name),
    email: clean(input.email).toLowerCase(),
    message: input.message.trim(),
    status: "new",
    createdAt: new Date(),
    source: metadata?.source ?? "website",
    userAgent: metadata?.userAgent,
    ip: metadata?.ip,
  };

  const result = await collection.insertOne(doc as ContactMessageRecord);
  return result.insertedId;
}

export async function getRecentContactMessages(limit = 100) {
  const db = await getMongoDb();
  const collection = db.collection<ContactMessageRecord>("contact_messages");
  return collection.find({}).sort({ createdAt: -1 }).limit(limit).toArray();
}
