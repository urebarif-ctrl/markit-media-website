import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  const isVercel = Boolean(process.env.VERCEL);
  let dbPath = path.join(process.cwd(), "data", "markit.db");

  if (isVercel) {
    // Next/Vercel can place traced assets beside a server function rather than at process.cwd().
    // Resolve the bundled seed from known runtime locations and copy it to /tmp, the writable
    // filesystem guaranteed for serverless functions. This also prevents SQLite from ever
    // attempting sidecar files inside the immutable deployment bundle.
    const candidates = [
      dbPath,
      path.join(process.cwd(), ".next", "server", "data", "markit.db"),
      path.join(__dirname, "..", "..", "data", "markit.db"),
      path.join(__dirname, "..", "..", "..", "data", "markit.db"),
      path.join("/var/task", "data", "markit.db"),
    ];
    const bundledDb = candidates.find((candidate) => fs.existsSync(candidate));
    if (!bundledDb) {
      throw new Error(`Bundled SQLite database not found. Checked: ${candidates.join(", ")}`);
    }

    const tmpDb = "/tmp/markit.db";
    if (!fs.existsSync(tmpDb)) fs.copyFileSync(bundledDb, tmpDb);
    dbPath = tmpDb;
  }

  db = new Database(dbPath, isVercel ? { readonly: true, fileMustExist: true } : undefined);

  if (isVercel) {
    db.pragma("foreign_keys = ON");
    return db;
  }

  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      service TEXT DEFAULT '',
      budget TEXT DEFAULT '',
      message TEXT NOT NULL,
      submitted_at TEXT NOT NULL,
      ip TEXT DEFAULT '',
      status TEXT DEFAULT 'new',
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT DEFAULT '',
      content TEXT DEFAULT '',
      cover_image TEXT DEFAULT '',
      category TEXT DEFAULT '',
      tags TEXT DEFAULT '[]',
      author TEXT DEFAULT 'Markit Media',
      status TEXT DEFAULT 'draft',
      meta_title TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      og_image TEXT DEFAULT '',
      reading_time INTEGER DEFAULT 5,
      noindex INTEGER DEFAULT 0,
      published_at TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      width INTEGER DEFAULT 0,
      height INTEGER DEFAULT 0,
      alt_text TEXT DEFAULT '',
      folder TEXT DEFAULT 'general',
      url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT DEFAULT '',
      role TEXT DEFAULT 'editor',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      page TEXT DEFAULT '',
      referrer TEXT DEFAULT '',
      user_agent TEXT DEFAULT '',
      ip TEXT DEFAULT '',
      data TEXT DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
    CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
    CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
    CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published_at);
    CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder);
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      source TEXT DEFAULT 'website',
      subscribed_at TEXT NOT NULL DEFAULT (datetime('now')),
      ip TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'active'
    );

    CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
    CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);
    CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
    CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

    CREATE TABLE IF NOT EXISTS proposals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      client_name TEXT NOT NULL,
      client_email TEXT DEFAULT '',
      client_company TEXT DEFAULT '',
      title TEXT NOT NULL DEFAULT 'Proposal',
      subtitle TEXT DEFAULT '',
      intro TEXT DEFAULT '',
      packages TEXT DEFAULT '[]',
      commercial_notes TEXT DEFAULT '[]',
      case_studies TEXT DEFAULT '[]',
      whatsapp TEXT DEFAULT '',
      currency TEXT DEFAULT 'PKR',
      status TEXT DEFAULT 'draft',
      valid_until TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_number TEXT UNIQUE NOT NULL,
      proposal_id INTEGER,
      client_name TEXT NOT NULL,
      client_email TEXT DEFAULT '',
      client_company TEXT DEFAULT '',
      client_address TEXT DEFAULT '',
      items TEXT DEFAULT '[]',
      subtotal REAL DEFAULT 0,
      tax_rate REAL DEFAULT 0,
      tax_amount REAL DEFAULT 0,
      total REAL DEFAULT 0,
      currency TEXT DEFAULT 'PKR',
      status TEXT DEFAULT 'draft',
      due_date TEXT,
      paid_at TEXT,
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE SET NULL
    );

    CREATE INDEX IF NOT EXISTS idx_proposals_slug ON proposals(slug);
    CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
    CREATE INDEX IF NOT EXISTS idx_invoices_number ON invoices(invoice_number);
    CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
    CREATE INDEX IF NOT EXISTS idx_invoices_proposal ON invoices(proposal_id);
  `);

  return db;
}
