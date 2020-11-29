import { useEffect, useState } from 'react'

function useNetwork() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine)

  useEffect(() => {
    window.addEventListener('offline', () => {
      setIsOnline(window.navigator.onLine)
    })
    window.addEventListener('online', () => {
      setIsOnline(window.navigator.onLine)
    })
  }, [])

  return [isOnline, 1]
}

export default useNetwork
