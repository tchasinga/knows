import { View, Text, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import useAuthStore from '../../store/authStore.js'

export default function Index () {
  const { token } = useAuthStore()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // http://localhost:8000/api/v2/book

  const fetchBooks = async (pageNumber = 1, refreshing = false) => {}

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    if (!token) {
      Alert.alert('Error', 'You need to be logged in to post a book')
      return
    }
  }, [token])

  return (
    <View>
      <Text>index welcome page</Text>
    </View>
  )
}
