import Link from "next/link";

export default function NotFound(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="mb-6 text-lg">Sorry, the page you are looking for does not exist.</p>
            <Link
                href="/"
                className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
            >
                Go back to Home
            </Link>
        </div>
    );
};
