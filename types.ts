
export enum TransactionStatus {
  PENDING = 'Pendiente',
  APPROVED = 'Aprobada',
  REJECTED = 'Rechazada'
}

export interface Transaction {
  id: string;
  date: string; // ISO string
  user: {
    fullName: string;
    email: string;
    phone: string;
    documentType: string; // New
    documentNumber: string;
    bankName: string; // Will store the Withdrawal Method Name
    accountNumber: string; // Will store the concatenated dynamic details
    telegramChatId?: string; // New: Optional Client Telegram ID
  };
  platform: string;
  amountSent: number;
  currencySent: string;
  amountReceived: number;
  currencyReceived: string;
  exchangeRate: number;
  commission: number;
  proofUrl: string | null; // Base64 string of the image
  status: TransactionStatus;
}

export interface Currency {
  code: string; // e.g., 'USD'
  name: string; // e.g., 'Dólar Americano'
  symbol: string; // e.g., '$'
  decimals: number; // e.g., 2
}

export interface ExchangeRate {
  pair: string; // e.g., 'USD-PYG'
  rate: number;
  commissionPct: number;
  commissionFixed: number;
}

export interface Platform {
  id: string;
  name: string;
  inputCurrency: string; // New: Base currency for the platform (e.g. Tigo Money = PYG)
  commissionPct: number;
  commissionFixed: number;
  commissionCurrency: string; // Currency for fixed commission
  minAmount: number;
  minAmountCurrency: string; // Currency for min amount
}

export interface DepositField {
  id: string;
  label: string; // e.g. "Titular", "Nro de Cuenta"
  value: string; // e.g. "Juan Perez", "123456789"
}

export interface DepositAccount {
  id: string;
  title: string; // e.g. "Transferencia Bancaria (Itaú)"
  type: 'BANK' | 'WALLET' | 'CRYPTO' | 'PAYPAL'; // Expanded types
  currency: string; // e.g. "PYG", "USD", "USDT"
  imageUrl?: string; // New: Logo URL for the account
  note?: string; // New: Optional note for the client (e.g. commission warnings)
  fields: DepositField[];
}

// NEW: Withdrawal Methods (For client to fill out)
export interface WithdrawalField {
  id: string;
  label: string; // e.g. "Nombre del Banco", "Nro de Cuenta"
  placeholder: string; // e.g. "Ej: Itaú", "Ej: 000..."
  required: boolean;
}

export interface WithdrawalMethod {
  id: string;
  name: string; // e.g. "Depósito Bancario", "Giro Tigo"
  currencies: string[]; // List of supported currencies for receiving (e.g. ['PYG', 'USD'])
  note?: string; // New: Optional note for withdrawal method
  fields: WithdrawalField[];
}

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icon: string; // 'calculator' | 'form' | 'money' | 'send' | 'security'
}

export interface TutorialItem {
  id: string;
  title: string;
  url: string;
}

// NEW: Global Appearance Configuration
export interface AppAppearance {
  appName: string;
  logoUrl: string; // Optional external logo URL
  
  // Home Page Texts
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // How It Works Section
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  steps: HowItWorksStep[];

  // Tutorial Section
  showTutorial: boolean;
  tutorialTitle: string;
  tutorials: TutorialItem[]; // Changed from single URL to list

  // Social Links
  socialLinks: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
  };

  // PDF Settings
  pdfHeader: string;
  pdfFooter: string;

  // Footer Settings
  footerCopyright: string;
  footerDescription: string;
}

// NEW: Admin User Interface
export interface AdminUser {
  id: string;
  username: string;
  password: string;
  role: 'ADMIN' | 'AGENT';
  permissions: string[]; // Array of allowed ViewStates e.g. ['dashboard', 'platforms']
}

// NEW: Notification System Types
export type NotificationTrigger = 'NEW_REQUEST' | 'APPROVED' | 'REJECTED' | 'DELETED';
export type NotificationRecipient = 'ADMIN' | 'CLIENT' | 'BOTH';

export interface NotificationTemplate {
  id: string;
  name: string;
  trigger: NotificationTrigger;
  recipient: NotificationRecipient;
  template: string; // HTML supported text with {variables}
  active: boolean;
}

// NEW: Connections Module Types
export interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
  dbName?: string;
  schema: string; // Default 'public'
  connected: boolean;
  lastChecked?: string;
}

export interface MySQLConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
  charset: string; // Default 'utf8mb4'
  connected: boolean;
  lastChecked?: string;
}

export interface ConnectionSettings {
  activeProvider: 'LOCAL' | 'SUPABASE' | 'MYSQL';
  supabase: SupabaseConfig;
  mysql: MySQLConfig;
}

// NEW: System Configuration (Maintenance, Telegram, Data)
export interface SystemConfig {
  maintenanceMode: boolean;
  telegramToken: string;
  telegramChatId: string;
  dataRetentionDays: number;
  maintenanceTitle?: string;
  maintenanceMessage?: string;
  
  // Notification Global Switch and Templates
  notificationsEnabled: boolean;
  clientNotificationsEnabled: boolean; // Allow clients to receive
  notificationTemplates: NotificationTemplate[];

  // Connections Module
  connections: ConnectionSettings;
}
