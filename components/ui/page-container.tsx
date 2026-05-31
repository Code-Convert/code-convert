interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

export function PageContainer({ children, maxWidth = '7xl' }: PageContainerProps) {
  return (
    <div className="relative z-10 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20">
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6`}>
        {children}
      </div>
    </div>
  );
}
