import "reflect-metadata";
import "flowbite";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import {initFlowbite} from "flowbite";
import type {AppProps} from "next/app";
import type {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {type ReactElement, useEffect} from "react";
import {ToastContainer} from "react-toastify";

import Layout from "@/components/Layout";

export default function App({
    Component, pageProps: {session, ...pageProps},
}: AppProps): ReactElement {
    useEffect(() => {
        initFlowbite();
    });

    return <SessionProvider session={session as Session}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <ToastContainer theme="dark" />
    </SessionProvider>;
}
