type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
        'bg-slate-900 text-slate-50 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500',
    secondary:
        'border border-slate-300 text-slate-800 bg-white hover:bg-slate-50 disabled:border-slate-200 disabled:text-slate-400',
    ghost:
        'bg-transparent text-slate-600 hover:bg-slate-100 disabled:text-slate-400',
};

export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => {
    const classes = `
        inline-flex items-center justify-center gap-2
        px-4 py-2 rounded-md text-sm font-medium
        transition-colors duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100
        ${VARIANT_CLASSES[variant]} ${className}
    `;
    return <button className={classes} {...props} />;
};

