import Document, { Html } from "next/document";
import Head from "next/head";

export default class MyDocument extends Document{
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Open+Sans:wght@400;600&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                </Head>
            </Html>
        )
    } 
}