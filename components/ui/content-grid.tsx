interface ContentGridProps {
  children: React.ReactNode;
  columns?: { md?: number; lg?: number };
}

export function ContentGrid({ children, columns = { md: 2, lg: 3 } }: ContentGridProps) {
  return (
    <div className={`grid md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} gap-4 sm:gap-6 md:gap-8`}>
      {children}
    </div>
  );
}
