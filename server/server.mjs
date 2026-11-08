import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import crypto from "node:crypto";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8787);
const origin = process.env.APP_ORIGIN || `http://localhost:${port}`;

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  }
}));

const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const yandexConfigured = Boolean(process.env.YANDEX_CLIENT_ID && process.env.YANDEX_CLIENT_SECRET);

app.get("/api/status", (_req, res) => {
  res.json({
    version: "0.0.18",
    googleConfigured,
    yandexConfigured,
    note: "OAuth callback token exchange and mailbox synchronization are not implemented yet."
  });
});

app.get("/api/auth/google", (req, res) => {
  if (!googleConfigured) return res.status(503).send("Set Google OAuth credentials in .env first.");
  const state = crypto.randomBytes(24).toString("hex");
  req.session.googleState = state;
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${origin}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
    access_type: "offline",
    prompt: "consent",
    state
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

app.get("/api/auth/google/callback", (req, res) => {
  if (!googleConfigured) return res.status(503).send("Google OAuth is not configured.");
  if (!req.query.code || req.query.state !== req.session.googleState) {
    return res.status(400).send("OAuth state validation failed.");
  }
  res.status(501).send("OAuth callback reached. Token exchange, encrypted token storage, and Gmail synchronization remain to be implemented.");
});

app.get("/api/auth/yandex", (req, res) => {
  if (!yandexConfigured) return res.status(503).send("Set Yandex OAuth credentials in .env first.");
  const state = crypto.randomBytes(24).toString("hex");
  req.session.yandexState = state;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.YANDEX_CLIENT_ID,
    redirect_uri: `${origin}/api/auth/yandex/callback`,
    state
  });
  res.redirect(`https://oauth.yandex.ru/authorize?${params}`);
});

app.get("/api/auth/yandex/callback", (req, res) => {
  if (!yandexConfigured) return res.status(503).send("Yandex OAuth is not configured.");
  if (!req.query.code || req.query.state !== req.session.yandexState) {
    return res.status(400).send("OAuth state validation failed.");
  }
  res.status(501).send("OAuth callback reached. Token exchange and mailbox access remain to be implemented.");
});

app.get("/api/messages", (_req, res) => {
  res.status(501).json({
    error: "mail_sync_not_configured",
    message: "Implement provider token exchange, encrypted token storage, and message API calls."
  });
});

app.listen(port, () => {
  console.log(`Mail Agent v0.0.18 backend at ${origin}`);
  console.log(`Google OAuth configured: ${googleConfigured}`);
  console.log(`Yandex OAuth configured: ${yandexConfigured}`);
});
