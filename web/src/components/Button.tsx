interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
}

export const Button = ({
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) => {
    const baseStyles =
        "px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300",
        outline:
            "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        />
    );
};
