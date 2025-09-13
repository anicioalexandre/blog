import { type ChangeEvent, type FormEvent, useCallback, useEffect, useState } from 'react'

import { z } from 'zod'

import type { GetInputProps } from './types'

type ValidationMode = 'onBlur' | 'onChange'

export function useReactForm<T extends Record<string, unknown>>({
  schema,
  initialValues,
  mode = 'onChange',
}: {
  schema: z.ZodSchema<T>
  initialValues: T
  mode?: ValidationMode
}) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isValid, setIsValid] = useState(true)

  const validate = useCallback(() => {
    const result = schema.safeParse(values)
    if (!result.success) {
      const formErrors: Partial<Record<keyof T, string>> = {}
      result.error.issues.forEach((issue) => {
        const pathKey = issue.path[0] as keyof T
        formErrors[pathKey] = issue.message
      })
      setErrors(formErrors)
      setIsValid(false)
      return false
    }
    setErrors({})
    setIsValid(true)
    return true
  }, [schema, values])

  const handleChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }))
      if (mode === 'onChange') {
        validate()
      }
    },
    [mode, validate],
  )

  const getInputProps = <K extends keyof T>(field: K): GetInputProps<T[K]> => ({
    value: values[field],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(field, e.target.value as T[K]),
    onBlur: () => {
      if (mode === 'onBlur') {
        validate()
      }
    },
    error: errors[field],
  })

  const handleSubmit = (onSubmit: (formValues: T) => void | Promise<void>) => {
    return (e: FormEvent) => {
      e.preventDefault()
      if (validate()) {
        onSubmit(values)
      }
    }
  }

  const resetValues = () => {
    setValues(initialValues)
    setErrors({})
    setIsValid(true)
  }

  useEffect(() => {
    validate()
  }, [validate])

  return {
    resetValues,
    getInputProps,
    handleChange,
    handleSubmit,
    validate,
    errors,
    values,
    isValid,
  }
}
