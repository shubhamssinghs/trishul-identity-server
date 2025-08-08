import type { SidebarOptions } from "../types";

export const sidebarOptions: SidebarOptions[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", to: "/", icon: "Home" },
      { label: "System Information", to: "/system-information", icon: "Gauge" },
    ],
  },
  {
    group: "Users",
    items: [
      { label: "User List", to: "/users", icon: "Users" },
      { label: "Login Attempts", to: "/login-attempts", icon: "Key" },
      { label: "Sessions", to: "/sessions", icon: "Clock" },
    ],
  },
  {
    group: "Access Control",
    items: [
      { label: "Roles", to: "/roles", icon: "ShieldCheck" },
      { label: "Permissions", to: "/permissions", icon: "Lock" },
    ],
  },
  {
    group: "Security",
    items: [
      { label: "Tokens", to: "/tokens", icon: "Key" },
      { label: "Audit Logs", to: "/audit-logs", icon: "ClipboardList" },
      { label: "2FA Config", to: "/2fa", icon: "ShieldCheck" },
      { label: "Rate Limiting", to: "/rate-limits", icon: "Gauge" },
    ],
  },
  {
    group: "Integrations",
    items: [
      { label: "OAuth Clients", to: "/oauth-clients", icon: "GlobeAlt" },
      { label: "SMTP / Email", to: "/email-config", icon: "Mail" },
      { label: "Webhooks", to: "/webhooks", icon: "Link" },
    ],
  },
  {
    group: "Dev Tools",
    items: [
      { label: "API Keys", to: "/api-keys", icon: "Terminal" },
      { label: "API Docs", to: "/api-docs", icon: "BookOpen" },
      { label: "Mock/Test Users", to: "/test-users", icon: "Flask" },
    ],
  },
];
