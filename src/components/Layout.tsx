import type {PropsWithChildren, ReactElement} from "react";

import NavBar from "./NavBar";

export default function Layout({children}: PropsWithChildren): ReactElement {
    return <main>
        <NavBar />
        {children}
    </main>;
}
