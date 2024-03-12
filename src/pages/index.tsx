import {Inter} from "next/font/google";
import type {ReactElement} from "react";

const inter = Inter({subsets: ["latin"] });

export default function Home(): ReactElement {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <h1>HELLO WORLD!</h1>
        </main>
    );
}
