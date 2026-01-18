export function AdPlaceholder({ className }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center bg-gray-100 border border-gray-200 rounded-md p-4 my-8 min-h-[100px] ${className}`}>
            <p className="text-xs text-gray-500 font-mono">Ad Space (Responsive)</p>
            {/* In production, replace this with actual AdSense code */}
        </div>
    );
}
