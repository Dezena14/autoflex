interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({
    label,
    error,
    className = "",
    ...props
}: InputProps) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-text-main">
                    {label}
                </label>
            )}
            <input
                className={`input-field ${error ? "border-red-500 focus:ring-red-500" : ""}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};
