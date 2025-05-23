import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'


// add tabs layout
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='create' options={{ title: 'Create' }} />
      <Tabs.Screen name='profile' options={{ title: 'Profile' }} />
    </Tabs>
  )
}