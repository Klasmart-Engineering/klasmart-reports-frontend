import { authClient } from "@/api/auth/client";
import { getCmsApiEndpoint } from "@/config";
import { REQUEST_RETRY_COUNT_MAX } from "@/config/validationValues";
import { redirectToAuth } from "@/utils/routing";
import { CmsApiClientProvider as KLCmsApiClientProvider } from "@kl-engineering/cms-api-client";
import { AxiosError } from "axios";
import React from "react";

export interface CmsApiClientProviderProps {
    children: React.ReactNode;
}

const retryHandler = async (error: AxiosError) => {
    if (error.response?.status !== 401 || error.response?.data.label !== `general_error_unauthorized`) throw error;
    try {
        await authClient.refreshToken();
    } catch (err) {
        redirectToAuth({
            withParams: true,
        });
        throw err;
    }
};

const CmsApiClientProvider: React.FC<CmsApiClientProviderProps> = (props) => {
    const cmsServiceEndpoint = getCmsApiEndpoint();

    const STALE_TIME = 60 * 1000; // 60 seconds

    return (
        <KLCmsApiClientProvider
            config={{
                baseURL: cmsServiceEndpoint,
                withCredentials: true,
            }}
            queryOptions={{
                defaultOptions: {
                    queries: {
                        staleTime: STALE_TIME,
                        retry: REQUEST_RETRY_COUNT_MAX,
                    },
                },
            }}
            responseInterceptors={[
                {
                    onRejected: retryHandler,
                },
            ]}
        >
            {props.children}
        </KLCmsApiClientProvider>
    );
}
export default CmsApiClientProvider;
