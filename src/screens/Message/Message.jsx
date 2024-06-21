import React from 'react'
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { SafeAreaView, View, Text } from "react-native"

//const Tab = createMaterialTopTabNavigator()

const MessageScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View className='m-5'>
            <Text className='text-2xl font-bold border-2 border-red-300'>Message Screen</Text>
        </View>
    </SafeAreaView>
  )
}

export default MessageScreen
