import clone from 'lodash/clone'
import toPath from 'lodash/toPath'
import keys from 'lodash/keys'
import * as Yup from 'yup'

export type YupErrorsType<Values> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object // [number] is the special sauce to get the type of array's element. More here https://github.com/Microsoft/TypeScript/pull/21316
      ? YupErrorsType<Values[K][number]>[] | string | string[]
      : string | string[]
    : Values[K] extends object
    ? YupErrorsType<Values[K]>
    : string
}

const isObject = (obj: any): obj is Record<string, any> => obj !== null && typeof obj === 'object'
const isInteger = (obj: any): boolean => String(Math.floor(Number(obj))) === obj

function getIn(obj: any, key: string | string[], def?: any, p = 0) {
  const path = toPath(key)
  let newObj = obj
  let newP = p
  while (newObj && newP < path.length) {
    newObj = newObj[path[(newP += 1)]]
  }
  return newObj === undefined ? def : newObj
}

function setIn(obj: any, path: string, value: any): any {
  const res: any = clone(obj) // this keeps inheritance when obj is a class
  let resVal: any = res
  let i = 0
  const pathArray = toPath(path)

  for (; i < pathArray.length - 1; i += 1) {
    const currentPath: string = pathArray[i]
    const currentObj: any = getIn(obj, pathArray.slice(0, i + 1))

    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal[currentPath] = clone(currentObj)
      resVal = clone(currentObj)
    } else {
      const nextPath: string = pathArray[i + 1]
      resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {}
      resVal = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {}
    }
  }

  // Return original object if new value is the same as current
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj
  }

  if (value === undefined) {
    delete resVal[pathArray[i]]
  } else {
    resVal[pathArray[i]] = value
  }

  // If the path array has a single element, the loop did not run.
  // Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.
  if (i === 0 && value === undefined) {
    delete res[pathArray[i]]
  }

  return res
}

export function yupToErrors<Values>(yupError: any): YupErrorsType<Values> {
  let errors: YupErrorsType<Values> = {}
  if (yupError.inner) {
    if (yupError.inner.length === 0) {
      return setIn(errors, yupError.path, yupError.message)
    }
    for (const err of yupError.inner) {
      if (!getIn(errors, err.path)) {
        errors = setIn(errors, err.path, err.message)
      }
    }
  }
  return errors
}

export async function checkValidation(
  errors: any,
  values: any,
  validation: Yup.ObjectSchema,
  callback?: CallableFunction,
  force?: boolean,
) {
  if (keys(errors).length || !callback || force) {
    try {
      await validation.validate(values, { abortEarly: false })
      if (callback) callback({})
      else return null
    } catch (error) {
      const result = yupToErrors(error)
      if (callback) callback(result)
      else return result
    }
  }
  return null
}
