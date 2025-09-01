/**
 * UK English (British English) formatting utilities
 * Ensures consistent British conventions across the LMS platform
 */

// UK English locale for formatting
export const UK_LOCALE = 'en-GB';

// Date formatting options
export const UK_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  locale: UK_LOCALE,
  dateStyle: 'long',
  timeZone: 'Europe/London'
};

export const UK_SHORT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  locale: UK_LOCALE,
  dateStyle: 'short',
  timeZone: 'Europe/London'
};

export const UK_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  locale: UK_LOCALE,
  timeStyle: 'short',
  timeZone: 'Europe/London'
};

export const UK_DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  locale: UK_LOCALE,
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Europe/London'
};

// Currency formatting options (GBP)
export const UK_CURRENCY_OPTIONS: Intl.NumberFormatOptions = {
  locale: UK_LOCALE,
  style: 'currency',
  currency: 'GBP',
  currencyDisplay: 'symbol'
};

// Number formatting options
export const UK_NUMBER_OPTIONS: Intl.NumberFormatOptions = {
  locale: UK_LOCALE,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
};

export const UK_PERCENTAGE_OPTIONS: Intl.NumberFormatOptions = {
  locale: UK_LOCALE,
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1
};

/**
 * Format a date using UK English conventions
 * @param date - Date to format
 * @param options - Formatting options (optional)
 * @returns Formatted date string
 */
export function formatUKDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = UK_DATE_OPTIONS
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat(UK_LOCALE, options).format(dateObj);
}

/**
 * Format a date in DD/MM/YYYY format (UK standard)
 * @param date - Date to format
 * @returns Date string in DD/MM/YYYY format
 */
export function formatUKShortDate(date: Date | string | number): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format a date in DD MMMM YYYY format (UK long format)
 * @param date - Date to format
 * @returns Date string in DD MMMM YYYY format
 */
export function formatUKLongDate(date: Date | string | number): string {
  return formatUKDate(date, UK_DATE_OPTIONS);
}

/**
 * Format a date and time using UK conventions
 * @param date - Date to format
 * @returns Formatted date and time string
 */
export function formatUKDateTime(date: Date | string | number): string {
  return formatUKDate(date, UK_DATE_TIME_OPTIONS);
}

/**
 * Format currency in GBP using UK conventions
 * @param amount - Amount to format
 * @param options - Formatting options (optional)
 * @returns Formatted currency string
 */
export function formatUKCurrency(
  amount: number,
  options: Intl.NumberFormatOptions = UK_CURRENCY_OPTIONS
): string {
  return new Intl.NumberFormat(UK_LOCALE, options).format(amount);
}

/**
 * Format a number using UK conventions
 * @param number - Number to format
 * @param options - Formatting options (optional)
 * @returns Formatted number string
 */
export function formatUKNumber(
  number: number,
  options: Intl.NumberFormatOptions = UK_NUMBER_OPTIONS
): string {
  return new Intl.NumberFormat(UK_LOCALE, options).format(number);
}

/**
 * Format a percentage using UK conventions
 * @param value - Value to format as percentage (0-1)
 * @param options - Formatting options (optional)
 * @returns Formatted percentage string
 */
export function formatUKPercentage(
  value: number,
  options: Intl.NumberFormatOptions = UK_PERCENTAGE_OPTIONS
): string {
  return new Intl.NumberFormat(UK_LOCALE, options).format(value);
}

/**
 * Get relative time in UK English (e.g., "2 hours ago", "yesterday")
 * @param date - Date to get relative time for
 * @returns Relative time string
 */
export function getUKRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) !== 1 ? 's' : ''} ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) !== 1 ? 's' : ''} ago`;
  return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) !== 1 ? 's' : ''} ago`;
}

/**
 * Format a file size using UK conventions
 * @param bytes - Size in bytes
 * @returns Formatted file size string
 */
export function formatUKFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format a phone number in UK format
 * @param phoneNumber - Phone number to format
 * @returns Formatted phone number string
 */
export function formatUKPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // UK phone number patterns
  if (cleaned.startsWith('44')) {
    // International format
    const number = cleaned.substring(2);
    if (number.length === 10) {
      return `+44 ${number.substring(0, 4)} ${number.substring(4, 7)} ${number.substring(7)}`;
    }
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    // UK domestic format
    return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`;
  }
  
  // Return original if no pattern matches
  return phoneNumber;
}

/**
 * Get UK-specific month names
 * @returns Array of UK month names
 */
export function getUKMonthNames(): string[] {
  return [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
}

/**
 * Get UK-specific day names
 * @returns Array of UK day names
 */
export function getUKDayNames(): string[] {
  return [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
}

/**
 * Get UK-specific short day names
 * @returns Array of UK short day names
 */
export function getUKShortDayNames(): string[] {
  return [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ];
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const today = new Date();
  return dateObj.toDateString() === today.toDateString();
}

/**
 * Check if a date is yesterday
 * @param date - Date to check
 * @returns True if date is yesterday
 */
export function isYesterday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateObj.toDateString() === yesterday.toDateString();
}

/**
 * Check if a date is this week
 * @param date - Date to check
 * @returns True if date is this week
 */
export function isThisWeek(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return dateObj >= startOfWeek && dateObj <= endOfWeek;
}

/**
 * Check if a date is this month
 * @param date - Date to check
 * @returns True if date is this month
 */
export function isThisMonth(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const today = new Date();
  return dateObj.getMonth() === today.getMonth() && dateObj.getFullYear() === today.getFullYear();
}

/**
 * Check if a date is this year
 * @param date - Date to check
 * @returns True if date is this year
 */
export function isThisYear(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const today = new Date();
  return dateObj.getFullYear() === today.getFullYear();
}
