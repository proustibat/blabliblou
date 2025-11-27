type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
        'bg-slate-900 text-slate-50 hover:bg-slate-800 ',
    secondary:
        'border border-slate-300 text-slate-800 bg-white hover:bg-slate-50 ',
    ghost:
        'bg-transparent text-slate-600 hover:bg-slate-100 ',
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

