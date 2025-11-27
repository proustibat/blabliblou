type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
};

export const Card = ({ title, children, className = '', ...props }: CardProps) => {
    return (
        <div className={`bg-white dark:bg-gray-800 shadow-md rounded p-4 ${className}`} {...props}>
            {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
            {children}
        </div>
    );
};

