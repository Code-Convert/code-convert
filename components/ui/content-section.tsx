interface ContentSectionProps {
  title: string;
  content: string;
}

export function ContentSection({ title, content }: ContentSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-400">{content}</p>
    </div>
  );
}
