import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
            <article className="p-8 max-w-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>

                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                    Failed to load data
                </h2>

                <p className="text-slate-500 mb-6">{message}</p>

                {onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-md cursor-pointer"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                )}
            </article>
        </div>
    );
}