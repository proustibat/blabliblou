type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
};

export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => {
    const classes = `${VARIANT_CLASSES[variant]} px-4 py-2 rounded font-medium transition ${className}`;
    return <button className={classes} {...props} />;
};

