import { Home, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-8">
                    <HelpCircle className="w-10 h-10 text-slate-400" />
                </div>

                <h1 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">
                    Page not found
                </h1>

                <p className="text-slate-600 mb-8 text-lg">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                    <Home className="w-4 h-4" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
