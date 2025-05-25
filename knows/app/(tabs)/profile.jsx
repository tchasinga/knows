import { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native'
import React from 'react'
import  useAuthStore  from '../../store/authStore.js'
import styles from '../../assets/styles/profile.styles.js'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import moment from 'moment'
import COLORS from '../../constant/colors.js'

export default function Profile () {
  const { user, logout, token } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [userBooks, setUserBooks] = useState([])

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Logout',
        onPress: () => logout()
      }
    ])
  }

  const fetchUserBooks = async () => {
    if (!token) return

    try {
      const response = await fetch('http://localhost:8000/api/v2/book/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user books')
      }

      const data = await response.json()
      setUserBooks(data.books || [])
    } catch (error) {
      console.error('Error fetching user books:', error)
      Alert.alert('Error', 'Failed to load your books')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const deleteBook = async bookId => {
    Alert.alert('Delete Book', 'Are you sure you want to delete this book?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: async () => {
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

            // Refresh the book list after deletion
            fetchUserBooks()
            Alert.alert('Success', 'Book deleted successfully')
          } catch (error) {
            console.error('Error deleting book:', error)
            Alert.alert('Error', 'Failed to delete book')
          }
        }
      }
    ])
  }

  useEffect(() => {
    fetchUserBooks()
  }, [token])

  const onRefresh = () => {
    setRefreshing(true)
    fetchUserBooks()
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={COLORS.primary} />
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
        />
      }
    >
      {/* Profile Header */}
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
            Member since {moment(user?.createdAt).format('MMMM YYYY')}
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name='log-out-outline' size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Books Section */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>My Books</Text>
        <Text style={styles.booksCount}>
          {userBooks.length} {userBooks.length === 1 ? 'book' : 'books'}
        </Text>
      </View>

      {userBooks.length > 0 ? (
        <View style={styles.booksList}>
          {userBooks.map(book => (
            <View key={book._id} style={styles.bookItem}>
              <Image
                source={{ uri: book.image }}
                style={styles.bookImage}
                contentFit='cover'
              />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookCaption} numberOfLines={2}>
                  {book.caption}
                </Text>
                <Text style={styles.bookDate}>
                  Added {moment(book.createdAt).fromNow()}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteBook(book._id)}
              >
                <Ionicons
                  name='trash-outline'
                  size={20}
                  color={COLORS.danger}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name='book-outline'
            size={40}
            color={COLORS.textSecondary}
          />
          <Text style={styles.emptyText}>You have not added any books yet</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Your First Book</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}
