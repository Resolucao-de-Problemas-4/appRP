import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  Image,
} from "react-native";
import { API_REST } from "../api/api";
import { AUTH_ROUT_DRIVER } from "../api/authdriver";
import { PORT } from "../api/port";
import { tokenInfoMotorista } from "../token";

export default function DriverLogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(email, password) {
    axios
      .post(API_REST + "" + PORT + "" + AUTH_ROUT_DRIVER, {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.status == 200) {
          tokenInfoMotorista.name = response.data.driver.name
          tokenInfoMotorista.email = response.data.driver.email
          tokenInfoMotorista.token = response.data.token
          tokenInfoMotorista.cnh = response.data.driver.CNH
          
          if(response.data.driver.carSigned === false){
            navigation.navigate("CarUP");

          }else{
            navigation.navigate("DMenu");
          }
        }
      })
      .catch(function (error) {
        Alert.alert("Credenciais erradas");
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: "https://i.imgur.com/0FltieF.png" }}
      />
      <View style={styles.view}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.fieldInput}
        />

        <Text style={styles.text}>Senha</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.fieldInput}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="LogIn"
          color="red"
          onPress={() => login(email, password)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  view: {
    height: "15%",
  },
  fieldInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
    textAlign: "center",
    height: 35,
    width: 250,
    marginTop: 3,
    marginBottom: 5,
  },
  text: {
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
  },
  date: {
    width: "100%",
    marginBottom: 25,
  },
  button: {
    marginTop: 100,
    width: 250,
    height: 75,
  },
  logo: {
    width: 240,
    height: 200,
    marginBottom: 5,
  },
});
