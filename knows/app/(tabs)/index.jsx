import { View, Text, Alert, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import useAuthStore from '../../store/authStore.js'
import styles from '../../assets/styles/home.styles.js'

export default function Index () {
  const { token } = useAuthStore()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // http://localhost:8000/api/v2/book

  const fetchBooks = async (pageNumber = 1, refreshing = false) => {}

  const handleLoadMore = async () => {}

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  )
}
