import type { Employee } from '@/types'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useBaseHook } from './core/useBaseHook'

export const useEmployeesList = () => {
  const [data, setData] = useState<Employee[]>([])
  const { execute, loading } = useBaseHook()

  const list = async () => {
    try {
      const employeesListData = await execute(async () => {
        const res = await axios.get('/api/employees')
        return res.data
      })
      console.log('useEmployeesList: list: ', employeesListData)
      setData(employeesListData)
    } catch (error) {
      console.error('Error in useEmployeesList list: ', error)
      throw error
    }
  }

  useEffect(() => {
    list()
  }, [])

  return {
    data,
    loading,
    list
  }
}
