import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import useAuthStore from '../../store/authStore.js'

export default function Index () {

  const { token } = useAuthStore()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchBooks = async () => {}

  useEffect(() =>{
    fetchBooks()
  })

  return (
    <View>
      <Text>index welcome page</Text>
    </View>
  )
}
