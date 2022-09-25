import { useEffect, useState, Dispatch, SetStateAction } from "react"

export default <T>(
    key: string,
    initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)
        if (typeof initialValue === "function") return (<() => T>initialValue)()
        return initialValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}
