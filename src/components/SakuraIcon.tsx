import React from 'react';

interface SakuraIconProps {
  size?: number;
  className?: string;
  fill?: string;
}

export const SakuraIcon: React.FC<SakuraIconProps> = ({
  size = 24,
  className = '',
  fill = 'currentColor',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* 5-petal stylized cherry blossom */}
      <g fill={fill}>
        {/* Top Petal */}
        <path d="M12 2.5C10.5 4.5 10 7 12 9.5C14 7 13.5 4.5 12 2.5Z" opacity="0.95" />
        {/* Top Right Petal */}
        <path d="M18.5 7.5C16.5 7 14.5 8.5 13.5 11C16 11 18 10 18.5 7.5Z" opacity="0.95" />
        {/* Bottom Right Petal */}
        <path d="M16 18C15.5 15.8 13.5 14.8 12.5 13.5C12.8 16 14.2 18 16 18Z" opacity="0.95" />
        {/* Bottom Left Petal */}
        <path d="M8 18C9.8 18 11.2 16 11.5 13.5C10.5 14.8 8.5 15.8 8 18Z" opacity="0.95" />
        {/* Top Left Petal */}
        <path d="M5.5 7.5C6 10 8 11 10.5 11C9.5 8.5 7.5 7 5.5 7.5Z" opacity="0.95" />
        {/* Center pistil */}
        <circle cx="12" cy="12" r="1.8" fill="#FFF9F3" />
      </g>
    </svg>
  );
};

export const FloatingPetal: React.FC<{ style?: React.CSSProperties; className?: string }> = ({
  style,
  className = '',
}) => {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`floating-petal ${className}`}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M8 0C4 5 1 10 4 15C7 20 14 17 15 12C16 7 12 2 8 0Z"
        fill="#F45B93"
        opacity="0.3"
      />
    </svg>
  );
};

