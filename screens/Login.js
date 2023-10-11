import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput,Pressable,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Login = ({navigation}) => {
  const[email,setEmail]=useState("")
  const[password,SetPassword]=useState("")
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = ()=>{
    const user ={
      email:email,
      password:password
    }
    axios.post("http://192.168.1.5:8000/login",user).then((response)=>{
      console.log(response);
      const token = response.data.token
      AsyncStorage.setItem("authtoken",token)
      // console.log(authtoken);
      navigation.replace("Main")
    }).catch((error)=>{
      Alert.alert("login error","Invalid email id and password")
      console.log(error,"login error");
    })
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View>
        <Image style={{ width: 150, height: 100 }} source={require("../assets/logo.png")} />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 12, color: "#041E42" }}>
            Login In to your Account</Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View style={{
            flexDirection: 'row', alignItems: "center", gap: 5,
            backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30
          }}>
            <MaterialIcons name="email" style={{ fontSize: 28, color: 'black', marginLeft: 10 }} />
            <TextInput 
            value={email} onChangeText={(text)=>{setEmail(text)}}
            style={{ color: 'gray', marginVertical: 5, width: 300, fontSize: 20 }} placeholder="Enter Your Email" />
          </View>
        </View>
        <View style={{marginTop:10}}>
          <View style={{
            flexDirection: 'row', alignItems: "center", gap: 5,
            backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30
          }}>
            <Fontisto name="locked" style={{ fontSize: 28, color: 'black', marginLeft: 10 }} />
            <TextInput 
            value={password} onChangeText={(text)=>{SetPassword(text)}} secureTextEntry
            style={{ color: 'gray', marginVertical: 5, width: 300, fontSize: 20 }} placeholder="Enter Your Password" />
          </View>
        </View>

        <View style={{marginTop:12,flexDirection:"row",alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{color:'black',fontSize:17}}>Keep me logged in</Text>
          <Text style={{color:'#007fff',fontWeight:'500', fontSize:17}}>Forget Password</Text>
        </View>
        <View style={{marginTop:50}}>
          <Pressable onPress={handleLogin} style={{width:200,backgroundColor:"#FEBE10",borderRadius:6, marginLeft:"auto",marginRight:"auto",padding:15 }}>
            <Text style={{textAlign:'center',color:'white',fontSize:20,fontWeight:'bold'}}>Login</Text>
          </Pressable>
          <Pressable style={{marginTop:15}} onPress={() => navigation.navigate('Register')}>
            <Text style={{textAlign:'center',fontSize:17}}>Don't have an account ? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})
