"use client";
export default async function Home() {
    const handelClick = async () => {
        const response = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                theme: "dark",
                language: "en",
            }),
        });

        console.log(await response.json());
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full flex justify-center">
                <button
                    className="bg-red-600 p-4 rounded-md text-white"
                    onClick={handelClick}
                >
                    Set Cookie
                </button>
            </div>
        </main>
    );
}
