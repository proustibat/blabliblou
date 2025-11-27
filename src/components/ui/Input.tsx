import type React from "react";
import { useId } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    helperText?: string;
};

export const Input = ({ label, helperText, id, className = '', ...props }: InputProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
        <label className="block space-y-1.5" htmlFor={inputId}>
            {label && (
                <span className="text-sm font-medium text-slate-800">{label}</span>
            )}

            <input
                id={inputId}
                className={`
                    w-full rounded-lg border border-slate-300 bg-white
                    px-3 py-2 text-sm text-slate-900 shadow-sm
                    placeholder:text-slate-400
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                    focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100
                    ${className}
                `}
                {...props}
            />

            {helperText && (
                <p className="text-xs text-slate-500">{helperText}</p>
            )}
        </label>
    );
};