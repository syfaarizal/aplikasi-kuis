import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, className, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function AlertCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </BaseIcon>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <polygon points="10 8 16 12 10 16 10 8" />
    </BaseIcon>
  );
}

export function RotateCcwIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 12a9 9 0 0 1 15-6.7" />
      <path d="M3 4v5h5" />
      <path d="M21 12a9 9 0 0 1-15 6.7" />
      <path d="M21 20v-5h-5" />
    </BaseIcon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.8-4 5-6 8-6s6.2 2 8 6" />
    </BaseIcon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </BaseIcon>
  );
}

export function XCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 9 6 6" />
      <path d="m15 9-6 6" />
    </BaseIcon>
  );
}

export function TimerIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l3 2" />
      <path d="M9 2h6" />
    </BaseIcon>
  );
}
