'use client'

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({title, subtitle, value, onChange}) => {
    const onAdd =  useCallback(() => {
        onChange(value +1 )
    })

  return (
    <div>

    </div>
  )
}

export default Counter