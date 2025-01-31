import { useState } from 'react'

export const useBaseHook = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const execute = async <T>(fn: () => Promise<T>) => {
    try {
      setLoading(true)
      const response = await fn()
      return response
    } catch (error) {
      console.error('Error in useBaseHook excute: ', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    execute,
    setLoading
  }
}
