import { authClient } from "@/api/auth/client";
import { getReportsEndpoint } from "@/config";
import { REQUEST_RETRY_COUNT_MAX } from "@/config/validationValues";
import { redirectToAuth } from "@/utils/routing";
import { ReportsApiClientProvider as KLReportsApiClientProvider } from "@kl-engineering/reports-api-client";
import { AxiosError } from "axios";
import React from "react";
import { Cookies } from "react-cookie";

const AUTH_HEADER = `authorization`;
const ACCESS_TOKEN_COOKIE = `access`;

export interface ReportsApiClientProviderProps {
    children: React.ReactNode;
}
export enum WidgetView {
    TEACHER = `teacher`,
    STUDENT = `student`,
    DEFAULT = `default`
}

const ReportsApiClientProvider: React.FC<ReportsApiClientProviderProps> = (props) => {
    const reportsServiceEndpoint = getReportsEndpoint();

    const STALE_TIME = 60 * 1000; // 60 seconds

    const retryHandler = async (error: AxiosError) => {
        if (error.response?.status !== 401) throw error;
        try {
            await authClient.refreshToken();
            const updatedCookie = new Cookies();
            const updatedAccessToken = updatedCookie.get(ACCESS_TOKEN_COOKIE);
            error.config.headers![AUTH_HEADER] = updatedAccessToken;
        } catch (err) {
            redirectToAuth({
                withParams: true,
            });
            throw err;
        }
    };

    return (
        <KLReportsApiClientProvider
            config={{
                baseURL: reportsServiceEndpoint,
            }}
            queryOptions={{
                defaultOptions: {
                    queries: {
                        staleTime: STALE_TIME,
                        retry: REQUEST_RETRY_COUNT_MAX,
                    },
                },
            }}
            requestInterceptors={[
                {
                    onFulfilled: (config) => {
                        const updatedCookie = new Cookies();
                        const updatedAccessToken = updatedCookie.get(ACCESS_TOKEN_COOKIE);
                        const updatedConfig = {
                            ...config,
                            headers: {
                                ...config.headers,
                                [AUTH_HEADER]: updatedAccessToken,
                            },
                        };
                        return updatedConfig;
                    },
                },
            ]}
            responseInterceptors={[
                {
                    onRejected: retryHandler,
                },
            ]}
        >
            {props.children}
        </KLReportsApiClientProvider>
    );
}

export default ReportsApiClientProvider;
