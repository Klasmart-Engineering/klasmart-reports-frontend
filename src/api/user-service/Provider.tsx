import { cache } from "@/api/user-service/cache";
import { redirectToAuth } from "@/routing/utils";
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
} from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { RetryLink } from "@apollo/client/link/retry";
import { createUploadLink } from "apollo-upload-client";
import { sha256 } from 'crypto-hash';
import { GraphQLError } from "graphql";
// import { utils } from "@kl-engineering/kidsloop-px";
import React,
{ useMemo } from "react";

const REQUEST_RETRY_COUNT_MAX = 1;

const persistedQueryLink = createPersistedQueryLink({
    sha256,
});

// const objectCleanerLink = new ApolloLink((operation, forward) => {
//     operation.variables = utils.trimStrings(operation.variables); // clean request data
//     return forward(operation).map((value) => utils.trimStrings(value)); // clean response data
// });

const retryLink = new RetryLink({
    attempts: async (count, operation, error) => {
        if (count > REQUEST_RETRY_COUNT_MAX) return false;
        const isAuthError = error.result?.errors.find((error: GraphQLError) => error.extensions?.code === `UNAUTHENTICATED`);
        if (!isAuthError) return false;
        try {
            // await authClient.refreshToken();
            return true;
        } catch (err) {
            redirectToAuth();
            return false;
        }
    },
});

/**
 * "[RetryLink] does not (currently) handle retries for GraphQL errors in the response, only for network errors."
 * https://www.apollographql.com/docs/react/api/link/apollo-link-retry/
 * solution inspired by https://github.com/apollographql/apollo-link/issues/541
 */
const graphQLErrorPromoterLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((data) => {
        if (data?.errors?.length) throw {
            result: data,
        };
        return data;
    });
});

const uploadLink = createUploadLink({
    credentials: `include`,
    // uri: `${getAPIEndpoint()}user/`,
    uri: `/user/`,
});

interface Props {
}

const UserServiceProvider: React.FC<Props> = (props) => {
    const client = useMemo(() => new ApolloClient({
        credentials: `include`,
        link: ApolloLink.from([
            // persistedQueryLink, + OrganizationContactInfo = no bueno
            // objectCleanerLink,
            retryLink,
            graphQLErrorPromoterLink,
            uploadLink,
        ]),
        cache,
        queryDeduplication: true,
    }), []);

    return (
        <ApolloProvider client={client}>{props.children}</ApolloProvider>
    );
};

export default UserServiceProvider;
