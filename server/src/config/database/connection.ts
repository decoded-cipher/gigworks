import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const turso = createClient({
    url : "libsql://gigworks-decoded-cipher.turso.io",
    authToken : "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzMzNDYzODUsImlkIjoiMjc5N2ZiZjEtMmM2NC00ODBhLWFkOTMtNGFlMTUwM2FjNTAxIn0.cQu-1s539KbMk7Gu9eAiNkjWLBsgRIZ-kkVY6Znox7z41q4dZP0FiBthkEDMV4nUWKtDHYAw8ie9bHB3YgiLBw"
});

export const db = drizzle(turso);