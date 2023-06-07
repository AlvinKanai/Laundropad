'use client'

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void
}

const Counter: React.FC <> = () => {
  return (
    <div>Counter</div>
  )
}

export default Counter