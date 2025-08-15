"use client"

import { useState, useEffect, useCallback } from "react"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await apiCall()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { ...state, refetch }
}

export function useApiMutation<T, P>(apiCall: (params: P) => Promise<T>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = useCallback(
    async (params: P) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const data = await apiCall(params)
        setState({ data, loading: false, error: null })
        return data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred"
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        })
        throw error
      }
    },
    [apiCall],
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return { ...state, mutate, reset }
}
