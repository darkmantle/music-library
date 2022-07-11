import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import darkTheme from '../styles/theme/darkTheme';
import '../styles/globals.css';
import Layout from '../components/layout';
import Head from 'next/head';
interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(darkTheme);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Layout>
                    <Head>
                        <title>Vinyl</title>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    </Head>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;
