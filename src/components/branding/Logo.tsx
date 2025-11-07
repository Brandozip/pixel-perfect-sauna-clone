import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl md:text-4xl'
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <span className={`${sizeClasses[size]} font-heading font-semibold text-foreground`}>
        Saunas<span className="text-primary">Plus</span>
      </span>
    </Link>
  );
};
