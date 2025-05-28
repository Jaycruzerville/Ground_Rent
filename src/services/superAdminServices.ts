import Api from "@/utils/api"
import { IError } from "@/types"

import handleApiError from "@/utils/handleApiError"

const getAgents = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/agents", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}
const getAgentCustomers = async (
  id: string,
  params: Record<string, unknown>
) => {
  try {
    const { data } = await Api.get(`/agents/${id}/customers`, { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getAgentDetails = async (id: string) => {
  try {
    const { data } = await Api.get(`/agents/${id}`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getAgentSummary = async (id: string) => {
  try {
    const { data } = await Api.get(`/agents/${id}/user-summary`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getAgentTransactions = async (id: string) => {
  try {
    const { data } = await Api.get(`/agents/${id}/transactions-summary`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgents = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/super-agents/", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgentCustomers = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(
      `/super-agents/${params?.id}/customers/`,
      params
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgentDetails = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/super-agents/${params?.id}/`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgentSummary = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(`/super-agents/${params?.id}/user-summary`, {
      params,
    })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgentTransactions = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(
      `/super-agents/${params?.id}/transactions-summary`,
      { params }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const addSuperAgent = async (params?: Record<string, unknown>) => {
  try {
    const { data } = await Api.post("/Property/", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const toggleAgentStatus = async (params: Record<string, unknown>) => {
  try {
    const { data } = await Api.patch(
      `/${params.userType}/${params.id}/status/`,
      params
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const addAgent = async (params?: Record<string, unknown>) => {
  try {
    const { data } = await Api.post("/auth/users/invitations/", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomers = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/customers/", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomerDetails = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/customers/${params?.id}/`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomerPlans = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/customers/${params?.id}/plans`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomerClaims = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/customers/${params?.id}/claims`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomersTransactions = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(
      `/customers/${params?.id}/transactions-summary`,
      { params }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getClaims = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/claims`, { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}
const getClaimsDetails = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/claims/${params?.id}`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}
const toggleClaimsStatus = async (params?: Record<string, unknown>) => {
  try {
    const { data } = await Api.patch(
      `/customers/${params?.customer_id}/claims/${params?.claim_id}/`,
      params?.data
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const editUser = async (formData?: FormData) => {
  const id = formData?.get("id")
  const userType = formData?.get("userType")
  formData?.delete("id")
  formData?.delete("userType")
  try {
    const { data } = await Api.patch(`/${userType}s/${id}/`, formData)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getTransactions = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/transactions/", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getTransactionsStats = async () => {
  try {
    const { data } = await Api.get("/transactions/stats/")
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getTransactionsDetails = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(`/transactions/${params?.id}`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getProperty = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/Property/", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getPropertyCustomers = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(`/Property/${params?.id}/customers/`, params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getPropertyDetails = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/Property/${params?.id}/`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getPropertyummary = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(
      `/Property/${params?.id}/user-summary`,
      params
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getPropertyTransactions = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(
      `/Property/${params?.id}/transaction-summary`,
      { params }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const SuperAdminService = {
  getAgents,
  getAgentCustomers,
  getAgentDetails,
  getSuperAgents,
  getSuperAgentCustomers,
  getSuperAgentDetails,
  addSuperAgent,
  toggleAgentStatus,
  addAgent,
  getCustomers,
  getCustomerDetails,
  getCustomerPlans,
  getCustomerClaims,
  getClaims,
  getClaimsDetails,
  getAgentSummary,
  getAgentTransactions,
  getSuperAgentTransactions,
  getSuperAgentSummary,
  getCustomersTransactions,
  toggleClaimsStatus,
  editUser,
  getTransactions,
  getTransactionsStats,
  getTransactionsDetails,
  getProperty,
  getPropertyCustomers,
  getPropertyDetails,
  getPropertyummary,
  getPropertyTransactions,
}

export default SuperAdminService
