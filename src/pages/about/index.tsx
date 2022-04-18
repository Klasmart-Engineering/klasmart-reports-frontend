import ErrorBoundary from "@/components/ErrorBoundary";
import LocaleProvider from "@/locale/Provider";
import StoreProvider from "@/store/Provider";
import React, { useState } from "react";
import { useResizeDetector } from "react-resize-detector";

interface AboutPageProps {
}

// @ts-expect-error
const List = React.lazy(() => import('reports/List'));
// @ts-expect-error
const ListItem = React.lazy(() => import('reports/ListItem'));

export default function AboutPage (props: AboutPageProps) {
    const [ state, setState ] = useState(true);
    const {ref, width = 0} = useResizeDetector();
    return (
        <StoreProvider>
            <button onClick={() => setState((state) => !state)}>Toggle state</button>
            <div ref={ref}>
                <div>About</div>
                <div style={{
                    display: `flex`,
                    backgroundColor: width > 300 ? `#ff000040` : `#0000ff40`,
                    flexDirection: width > 300 ? `row` : `column`,
                }}>
                    <div>Woop</div>
                    <div>Nooice</div>
                    {state ? (
                        <ErrorBoundary FallbackComponent={
                            <h1 style={{backgroundColor: `red`}}>Something went wrong.</h1>
                        }>
                            <React.Suspense fallback={<div>Whaddap yo</div>}>
                                <List
                                    header="Nice woop woop"
                                    items={[]}
                                />
                            </React.Suspense>
                        </ErrorBoundary>
                    ) : (
                        <ErrorBoundary FallbackComponent={<h1 style={{backgroundColor: `blue`}}>Something went wrong.</h1>}>
                            <React.Suspense fallback={<div>Whaddap yo</div>}>
                                <ListItem title="Some cool title"/>
                            </React.Suspense>
                        </ErrorBoundary>
                    )}
                </div>
            </div>
        </StoreProvider>
    );
}