'use client'

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number)
}

const Counter = () => {
  return (
    <div>Counter</div>
  )
}

export default Counter