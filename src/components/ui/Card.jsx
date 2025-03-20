import clsx from "clsx";

export function Card({ className, children }) {
    return (
        <div
            className={clsx(
                "bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg hover:shadow-xl hover:border-blue-500/70 transition-all duration-300",
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className, children }) {
    return <div className={clsx("p-4", className)}>{children}</div>;
}

export function CardContent({ className, children }) {
    return <div className={clsx("p-4 flex flex-col", className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
    return <div className={clsx("p-4 flex justify-between", className)}>{children}</div>;
}
