import gql from "graphql-tag.macro"
import * as ApolloReactCommon from "@apollo/client"
import * as ApolloReactHooks from "@apollo/client"
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type AuthResponse = {
  __typename?: "AuthResponse"
  user: User
  token: Scalars["String"]
}

export type BaseEntity = {
  __typename?: "BaseEntity"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type CreateJobInput = {
  jobName: Scalars["String"]
}

export type Job = {
  __typename?: "Job"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  jobName: Scalars["String"]
  author: User
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createJob: Job
  updateJob: Job
  destroyJob: Scalars["Boolean"]
  updateMe?: Maybe<User>
  login: AuthResponse
  register: AuthResponse
  logout?: Maybe<Scalars["Boolean"]>
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
}

export type MutationCreateJobArgs = {
  data: CreateJobInput
}

export type MutationUpdateJobArgs = {
  data: UpdateJobInput
  jobId: Scalars["String"]
}

export type MutationDestroyJobArgs = {
  jobId: Scalars["String"]
}

export type MutationUpdateMeArgs = {
  data: UpdateUserInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationRegisterArgs = {
  data: RegisterInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]
}

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput
}

export type Query = {
  __typename?: "Query"
  getJobs: Array<Job>
  me?: Maybe<User>
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type ResetPasswordInput = {
  password: Scalars["String"]
  token: Scalars["String"]
}

export type UpdateJobInput = {
  jobName: Scalars["String"]
}

export type UpdateUserInput = {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  houseId?: Maybe<Scalars["String"]>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  jobs: Array<Job>
}

export type MeFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "email"
>

export type MeQueryVariables = {}

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & MeFragment>
}

export type AllJobsQueryVariables = {}

export type AllJobsQuery = { __typename?: "Query" } & {
  getJobs: Array<
    { __typename?: "Job" } & Pick<
      Job,
      "id" | "jobName" | "createdAt" | "updatedAt"
    > & {
        author: { __typename?: "User" } & Pick<User, "firstName" | "lastName">
      }
  >
}

export type CreateJobMutationVariables = {
  data: CreateJobInput
}

export type CreateJobMutation = { __typename?: "Mutation" } & {
  createJob: { __typename?: "Job" } & Pick<Job, "id" | "jobName" | "createdAt">
}

export type DestroyJobMutationVariables = {
  data: Scalars["String"]
}

export type DestroyJobMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyJob"
>

export type EditJobNameMutationVariables = {
  jobId: Scalars["String"]
  newName: Scalars["String"]
}

export type EditJobNameMutation = { __typename?: "Mutation" } & {
  updateJob: { __typename?: "Job" } & Pick<Job, "updatedAt">
}

export type ForgotPasswordMutationVariables = {
  email: Scalars["String"]
}

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>

export type LoginMutationVariables = {
  data: LoginInput
}

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type RegisterMutationVariables = {
  data: RegisterInput
}

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type ResetPasswordMutationVariables = {
  data: ResetPasswordInput
}

export type ResetPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "resetPassword"
>

export const MeFragmentDoc = gql`
  fragment Me on User {
    id
    firstName
    lastName
    email
  }
`
export const MeDocument = gql`
  query Me {
    me {
      ...Me
    }
  }
  ${MeFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeQuery,
    MeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>
export const AllJobsDocument = gql`
  query allJobs {
    getJobs {
      id
      jobName
      createdAt
      updatedAt
      author {
        firstName
        lastName
      }
    }
  }
`

/**
 * __useAllJobsQuery__
 *
 * To run a query within a React component, call `useAllJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllJobsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllJobsQuery,
    AllJobsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<AllJobsQuery, AllJobsQueryVariables>(
    AllJobsDocument,
    baseOptions,
  )
}
export function useAllJobsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllJobsQuery,
    AllJobsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<AllJobsQuery, AllJobsQueryVariables>(
    AllJobsDocument,
    baseOptions,
  )
}
export type AllJobsQueryHookResult = ReturnType<typeof useAllJobsQuery>
export type AllJobsLazyQueryHookResult = ReturnType<typeof useAllJobsLazyQuery>
export type AllJobsQueryResult = ApolloReactCommon.QueryResult<
  AllJobsQuery,
  AllJobsQueryVariables
>
export const CreateJobDocument = gql`
  mutation createJob($data: CreateJobInput!) {
    createJob(data: $data) {
      id
      jobName
      createdAt
    }
  }
`

/**
 * __useCreateJobMutation__
 *
 * To run a mutation, you first call `useCreateJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobMutation, { data, loading, error }] = useCreateJobMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateJobMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateJobMutation,
    CreateJobMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateJobMutation,
    CreateJobMutationVariables
  >(CreateJobDocument, baseOptions)
}
export type CreateJobMutationHookResult = ReturnType<
  typeof useCreateJobMutation
>
export type CreateJobMutationResult = ApolloReactCommon.MutationResult<
  CreateJobMutation
>
export type CreateJobMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateJobMutation,
  CreateJobMutationVariables
>
export const DestroyJobDocument = gql`
  mutation destroyJob($data: String!) {
    destroyJob(jobId: $data)
  }
`

/**
 * __useDestroyJobMutation__
 *
 * To run a mutation, you first call `useDestroyJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyJobMutation, { data, loading, error }] = useDestroyJobMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDestroyJobMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyJobMutation,
    DestroyJobMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyJobMutation,
    DestroyJobMutationVariables
  >(DestroyJobDocument, baseOptions)
}
export type DestroyJobMutationHookResult = ReturnType<
  typeof useDestroyJobMutation
>
export type DestroyJobMutationResult = ApolloReactCommon.MutationResult<
  DestroyJobMutation
>
export type DestroyJobMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyJobMutation,
  DestroyJobMutationVariables
>
export const EditJobNameDocument = gql`
  mutation editJobName($jobId: String!, $newName: String!) {
    updateJob(jobId: $jobId, data: { jobName: $newName }) {
      updatedAt
    }
  }
`

/**
 * __useEditJobNameMutation__
 *
 * To run a mutation, you first call `useEditJobNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditJobNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editJobNameMutation, { data, loading, error }] = useEditJobNameMutation({
 *   variables: {
 *      jobId: // value for 'jobId'
 *      newName: // value for 'newName'
 *   },
 * });
 */
export function useEditJobNameMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditJobNameMutation,
    EditJobNameMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EditJobNameMutation,
    EditJobNameMutationVariables
  >(EditJobNameDocument, baseOptions)
}
export type EditJobNameMutationHookResult = ReturnType<
  typeof useEditJobNameMutation
>
export type EditJobNameMutationResult = ApolloReactCommon.MutationResult<
  EditJobNameMutation
>
export type EditJobNameMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditJobNameMutation,
  EditJobNameMutationVariables
>
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions)
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<
  ForgotPasswordMutation
>
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const ResetPasswordDocument = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, baseOptions)
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<
  ResetPasswordMutation
>
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>
