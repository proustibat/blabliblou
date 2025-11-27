type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export const Input = ({ label, id, className = '', ...props }: InputProps) => {
    const inputId = id || label.replace(/\s+/g, '').toLowerCase();
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={inputId} className="mb-1 font-medium text-gray-700">
                {label}
            </label>
            <input
                id={inputId}
                className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                {...props}
            />
        </div>
    );
};

