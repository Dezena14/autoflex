interface CardProps {
    children: React.ReactNode;
    title?: string;
    action?: React.ReactNode;
    className?: string;
}

export const Card = ({
    children,
    title,
    action,
    className = "",
}: CardProps) => {
    return (
        <div className={`card-base p-6 ${className}`}>
            {(title || action) && (
                <div className="flex justify-between items-center mb-6">
                    {title && (
                        <h2 className="text-xl font-bold text-text-main">
                            {title}
                        </h2>
                    )}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div>{children}</div>
        </div>
    );
};
