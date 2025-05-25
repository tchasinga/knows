/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import React from 'react'
import useAuthStore from '../../store/authStore.js'
import styles from '../../assets/styles/profile.styles.js'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import COLORS from '../../constant/colors.js'

export default function Profile () {
  const { user, logout, token } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [books, setBooks] = useState([])

  const handleLogout = () => {
    logout()
  }

  const fetchUserBooks = async () => {
    if (!token || !user?._id) {
      setLoading(false)
      setRefreshing(false)
      return
    }

    try {
      const response = await fetch(
        'http://localhost:8000/api/v2/book/users/data',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch books')
      }

      setBooks(data.books || data || []) // Handle both response formats
    } catch (error) {
      console.error('Error fetching books:', error.message)
      // You might want to show an error message to the user here
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleDeleteBook = async bookId => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v2/book/delete/${bookId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete book')
      }

      // Remove the deleted book from state
      setBooks(books.filter(book => book._id !== bookId))
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchUserBooks()
  }

  useEffect(() => {
    fetchUserBooks()
  }, [token, user?._id])

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={COLORS.primary} />
      </View>
    )
  }

  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.bookImage}
        contentFit='cover'
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookCaption} numberOfLines={2}>
          {item.caption}
        </Text>
        <Text style={styles.bookDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteBook(item._id)}
      >
        <Ionicons name='trash-outline' size={24} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user?.profilepic }}
          style={styles.profileImage}
          contentFit='cover'
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.memberSince}>
            Member since: {new Date(user?.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name='log-out-outline' size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>My Books</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      {books.length > 0 ? (
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.booksList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name='book-outline'
            size={48}
            color={COLORS.textSecondary}
          />
          <Text style={styles.emptyText}>You have not added any books yet</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Your First Book</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
