import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/core"
import { useLocalStorage } from "@noquarter/hooks"

import { Page } from "../components/Page"
import { useMe } from "../components/providers/MeProvider"
import { useLogout } from "../lib/hooks/useLogout"
import { gql, useQuery } from "@apollo/client"
import {
  CreateJobInput,
  Job,
  useCreateJobMutation,
  useDestroyJobMutation,
  useEditJobNameMutation,
} from "../lib/graphql"
import { Form } from "../components/Form"
import { Input } from "../components/Input"
import { FormError } from "../components/FormError"
import { useForm } from "../lib/hooks/useForm"
import Yup from "../lib/yup"
import { useToast } from "../lib/hooks/useToast"

export const ALL_JOBS = gql`
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

export const CREATE_JOB = gql`
  mutation createJob($data: CreateJobInput!) {
    createJob(data: $data) {
      id
      jobName
      createdAt
    }
  }
`
export const DESTROY_JOB = gql`
  mutation destroyJob($data: String!) {
    destroyJob(jobId: $data)
  }
`
export const EDIT_JOB_NAME = gql`
  mutation editJobName($jobId: String!, $newName: String!) {
    updateJob(jobId: $jobId, data: { jobName: $newName }) {
      updatedAt
    }
  }
`
const JobSchema = Yup.object().shape<CreateJobInput>({
  jobName: Yup.string()
    .required("Required")
    .min(5, "at least 5 characters")
    .max(60, "at most 60 characters"),
})

export const Dashboard: FC<RouteComponentProps> = () => {
  const { loading, error, data } = useQuery(ALL_JOBS)
  const me = useMe()
  const [, setColorMode] = useLocalStorage<"dark" | "light">("darkmode", "dark")
  const { colorMode, toggleColorMode } = useColorMode()
  const [createJob] = useCreateJobMutation()
  const [editJobName] = useEditJobNameMutation()
  const [destroyJob] = useDestroyJobMutation()
  const logout = useLogout()
  const toast = useToast()
  const form = useForm<CreateJobInput>({ validationSchema: JobSchema })

  const toggleColor = () => {
    setColorMode(colorMode === "light" ? "dark" : "light")
    toggleColorMode()
  }

  const onSubmit = async (values: CreateJobInput) => {
    const res = await createJob({
      variables: { data: values },
    })
    form.handler(res, {
      onSuccess: data => {
        toast({
          title: "Manually refresh this page.",
          description: `Job created. Name: ${data.createJob.jobName}. .`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      },
    })
  }
  const onEditJobName = async (jobId: string, newName: string) => {
    const res = await editJobName({
      variables: { jobId: jobId, newName: newName },
    })
    form.handler(res, {
      onSuccess: data => {
        toast({
          title: "Manually refresh this page.",
          description: `Job updated.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      },
    })
  }
  const onDestroy = async (jobId: string) => {
    const res = await destroyJob({
      variables: { data: jobId },
    })
    form.handler(res, {
      onSuccess: data => {
        toast({
          title: "Manually refresh this page.",
          description: `Job destroyed..`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      },
    })
  }
  if (loading)
    return (
      <Page>
        <Box>Loading</Box>
      </Page>
    )
  if (error) {
    return (
      <Page>
        <Box>Error! {error.message}</Box>
      </Page>
    )
  }
  const fetched = data.getJobs
  return (
    <Page>
      <Box>
        <Heading pos="absolute" top={4} mb={4}>
          Hello, {me.firstName} {me.lastName}
        </Heading>
        <Box>{fetched.length} Jobs</Box>
        <SimpleGrid minChildWidth="260px" spacing="1em" m="1em" w="90%">
          {fetched.map((job: Job, key: number) => (
            <Box key={key}>
              <Flex>
                {key + 1}.
                <Editable
                  defaultValue={job.jobName}
                  textAlign="center"
                  onSubmit={value => {
                    if (typeof value === "string") {
                      onEditJobName(job.id, value)
                    }
                  }}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Flex>
              <Icon
                name="delete"
                color="red.500"
                onClick={() => {
                  onDestroy(job.id)
                }}
              />
            </Box>
          ))}
        </SimpleGrid>
        <Box>
          <Icon name="add"/>
          <Box>
            <Form onSubmit={onSubmit} {...form}>
              <Input
                name="jobName"
                label="Job Name"
                placeholder="Name of Job"
              />
              <FormError display="flex" justifyContent="flex-end" />
              <Button
                type="submit"
                loadingText="loading"
                isLoading={form.formState.isSubmitting}
              >
                Create Job
              </Button>
            </Form>
          </Box>
        </Box>
      </Box>

      <Button onClick={logout} pos="absolute" bottom={4} right={4}>
        Logout
      </Button>

      <Button
        variant="outline"
        onClick={toggleColor}
        pos="absolute"
        bottom={4}
        left={4}
      >
        Toggle Color Mode
      </Button>
    </Page>
  )
}
