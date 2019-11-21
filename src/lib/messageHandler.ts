import { ApolloError } from "apollo-client";
import { message } from "antd";

interface MessageProps {
  message?: string;
  duration?: number;
}

/**
 *
 * @param err - ApolloError, error thrown from GraphQL Rresponse
 * @param messageOpts: { message?: string, duration?: number }
 */


let netWorkErrorCount = 0;
export const errorMessage = (err: ApolloError, messageOpts?: MessageProps) => {
  if (err.networkError) {
    netWorkErrorCount++;
    return netWorkErrorCount > 2 ? message.error(err.networkError.message) : null
  }

  return err.graphQLErrors
    ? message.error(
        (messageOpts && messageOpts.message) || err.graphQLErrors[0].message,
        (messageOpts && messageOpts.duration) || 2
      )
    : message.error(
        "An unknown error has occurred",
        (messageOpts && messageOpts.duration) || 2
      );
};
