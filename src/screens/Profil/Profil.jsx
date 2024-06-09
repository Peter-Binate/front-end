import React from 'react'
import { SafeAreaView, View, Text} from 'react-native'
//import InputProfil from "../../components/Input/InputProfil"

const Profil = () => {
  return (
    <SafeAreaView>
        {/* InputProfil */}
        <View className='m-5'>
            <Text className='text-2xl font-bold border-2 border-red-300'>
                Profil
            </Text>
        </View>
    </SafeAreaView>
  )
}

export default Profil