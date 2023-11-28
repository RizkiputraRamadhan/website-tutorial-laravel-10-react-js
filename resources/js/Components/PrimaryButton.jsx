export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `btn btn-sm btn-primary ${
                    disabled && ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
