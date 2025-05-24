import { View, Text, Alert, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import useAuthStore from '../../store/authStore.js'
import styles from '../../assets/styles/home.styles.js'
import { Image } from 'expo-image'

export default function Index() {
  const { token } = useAuthStore()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchBooks = async (pageNumber = 1, refreshing = false) => {
    try {
      if (refreshing) {
        setRefreshing(true)
      } else if (pageNumber === 1) {
        setLoading(true)
      }

      const response = await fetch(
        `http://localhost:8000/api/v2/book/all?page=${pageNumber}&limit=5`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }

      const data = await response.json()

      if (refreshing) {
        setBooks(data.books)
      } else {
        setBooks((prevBooks) => [...prevBooks, ...data.books])
      }

      setHasMore(pageNumber < data.totalPages)
      setPage(pageNumber)
    } catch (error) {
      console.error('Error fetching books:', error)
      Alert.alert('Error', 'Failed to fetch books. Please try again later.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleLoadMore = async () => {
    if (!loading && hasMore) {
      await fetchBooks(page + 1)
    }
  }

  const handleRefresh = async () => {
    setBooks([])
    setPage(1)
    setHasMore(true)
    await fetchBooks(1, true)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profilepic }}
            style={styles.avatar}
            contentFit='cover'
          />
          <Text style={styles.username}>{item.user.name}</Text>
        </View>
      </View>
      <View style={styles.bookImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.bookImage}
          contentFit='cover'
        />
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  )
}
