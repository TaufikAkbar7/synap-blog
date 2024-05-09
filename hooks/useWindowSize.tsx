import { useEffect, useState } from 'react'

export interface IStateWindowSize {
  width: number | undefined
  height: number | undefined
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<IStateWindowSize>({
    width: undefined,
    height: undefined
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
