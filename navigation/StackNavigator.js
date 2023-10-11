import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Iconicons from 'react-native-vector-icons/Ionicons' 
import ProductInfo from '../screens/ProductInfo';
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator()

    const BottomTab =()=>{
        return(
            <Tab.Navigator>
                <Tab.Screen name='Home' component={Home} 
                options={{
                    tabBarLabel:"Home",
                    tabBarStyle:{color:"#008E97"},
                    headerShown:false,
                    tabBarIcon:({focused})=>
                    focused ? (
                        <Iconicons name="home" size={24} color="#008E97" />
                    ):(
                        <Iconicons name="home-outline" size={24} color="black"/>
                    )
                }}
                />
                <Tab.Screen name='Profile' component={Home} 
                options={{
                    tabBarLabel:"Profile",
                    tabBarStyle:{color:"#008E97"},
                    headerShown:false,
                    tabBarIcon:({focused})=>
                    focused ? (
                        <Iconicons name="person" size={24} color="#008E97" />
                    ):(
                        <Iconicons name="person-outline" size={24} color="black" />
                    )
                }}
                />
                <Tab.Screen name='Cart' component={Home} 
                options={{
                    tabBarLabel:"Cart",
                    tabBarStyle:{color:"#008E97"},
                    headerShown:false,
                    tabBarIcon:({focused})=>
                    focused ? (
                        <Iconicons name="cart" size={24} color="#008E97" />
                    ):(
                        <Iconicons name="cart-outline" size={24} color="black" />
                    )
                }}
                />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} /> */}
                <Stack.Screen name="Main" component={BottomTab} options={{ headerShown: false }} />
                <Stack.Screen name='Info' component={ProductInfo} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})