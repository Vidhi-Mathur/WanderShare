import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-background via-input to-muted flex items-center justify-center p-4 overflow-hidden relative">
            <div className="relative z-10 w-full max-w-2xl">
                <div className="text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className="absolute inset-0 bg-primary rounded-full opacity-10 animate-pulse"></div>
                            <AlertCircle className="w-24 h-24 text-primary" strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-8xl md:text-9xl font-bold font-playfair text-foreground" style={{ letterSpacing: '-0.03em' }}>
                            404
                        </h1>
                        <p className="text-2xl md:text-3xl font-playfair text-foreground/80" style={{ letterSpacing: '-0.01em' }}>
                            Page Not Found
                        </p>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Oops! The page you're looking for seems to have wandered off the path. 
                        Let's help you get back on track.
                    </p>
                    <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-(--primary-dark) transition-all duration-300  hover:shadow-lg hover:-translate-y-0.5 group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
