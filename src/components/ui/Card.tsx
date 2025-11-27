type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
};

export const Card = ({ title, children, className = '', ...props }: CardProps) => {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 ${className}`}
      {...props}
    >
      {title && (
        <h3 className="text-sm font-semibold text-slate-900 mb-3 tracking-tight">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

