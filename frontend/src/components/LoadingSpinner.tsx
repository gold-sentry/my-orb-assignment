export function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-200 rounded-full" />
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" />
                </div>
                <p className="text-slate-600 text-lg font-medium">Loading Usage dashboard...</p>
            </div>
        </div>
    );
}