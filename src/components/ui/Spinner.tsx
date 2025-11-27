type SpinnerProps = {
    size?: number;
    className?: string;
};

export const Spinner = ({ size = 24, className = '' }: SpinnerProps) => {
    return (
        <div
            className={`animate-spin border-4 border-blue-500 border-t-transparent rounded-full ${className}`}
            style={{ width: size, height: size }}
        />
    );
};

