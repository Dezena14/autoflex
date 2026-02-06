interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export const Button = ({
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) => {
    const baseStyles =
        "px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        />
    );
};
