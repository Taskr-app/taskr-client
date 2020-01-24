import { ApolloError } from 'apollo-client';

export const isAuthenticationError = (err: ApolloError) => {
  if (!err) return null
  if (!err.graphQLErrors) return null
  const graphQLError = err.graphQLErrors[0]
  if (!graphQLError) return null
  const errorExtensions = graphQLError.extensions
  if (errorExtensions && errorExtensions.code === 'UNAUTHENTICATED') {
    return graphQLError.message
  }

  return null
}