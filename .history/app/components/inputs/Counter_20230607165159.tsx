'use client'
import { useCallback } from "react";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({title, subtitle, value, onChange}) => {
    const onAdd =  useCallback(() => {
        onChange(value + 1)
    }, [onChange, value])

    const onReduce = useCallback(() => {
        if(value === 1){
            return
        }
        onChange(value-1)
    }, [value, onChange])

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flx flex-row items-center gap-4">
                <div onClick={onReduce} className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center u">

                </div>
            </div>
        </div>
    )
}

export default Counter