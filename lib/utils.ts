import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Strip Quill-generated inline color/background styles so dark mode works */
export function sanitizeQuillHtml(html: string): string {
  return html
    .replace(/\s*color:\s*rgb\([^)]+\);?/g, '')
    .replace(/\s*background-color:\s*transparent;?/g, '')
    .replace(/\s*background-color:\s*rgb\([^)]+\);?/g, '')
    .replace(/style="\s*"/g, '')
}
