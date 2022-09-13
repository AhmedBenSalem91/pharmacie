import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Switch, TouchableOpacity  , Dismensions} from "react-native";
import { NativeBaseProvider, Image } from "native-base";

import "localstorage-polyfill";
const Screen = Dismensions.get('window')

function DetailProduit({ navigation, route }) {

  const [isEnabled, setIsEnabled] = useState(true);
  // console.log("route", route.params.data);
  const Detail = route.params.data;
  const [Role, setRole] = useState(true);
  //geting the Role of user and get the seleckted element Detail
  const [detail, setDetail] = useState(null);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const DisponiblitéDarticle = () => {
    Detail.etat === "Disponible" ? setIsEnabled(true) : setIsEnabled(false);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("etat"));
    // const detail =  JSON.parse(localStorage.getItem("Detail"));
    console.log(detail, "detail");
    setDetail(detail);
    data === "Pharmacien" ? setRole(false) : setRole(!false);
    console.log(Detail.photo, "photo");
    DisponiblitéDarticle();
  }, []);
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {Role ? (
          <View style={styles.container}>
            <View style={styles.ImageX}>
              <Image
                source={{ uri: Detail.photo }}
                style={{ height: 450, width: 460 }}
              />
            </View>
            <View>
              <Text style={styles.title}>
                Nom du produit : {Detail && Detail.nom}{" "}
              </Text>
            </View>
            <View>
              <Text style={styles.title}>
                Etat de la disponibilité : {Detail && Detail.etat}
              </Text>
              <View></View>
            </View>
            <View>
              <Text style={{ marginTop: "10%" }}>
                Trouver votre medicaments ici :{" "}
              </Text>
              <TouchableOpacity style={styles.Button}>
                <Text style={{ marginTop: "10%", marginLeft: "10%" }}>
                  Pharmacie
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Image style={styles.ImageX}
              source={{ uri: Detail.photo }}
            />
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View>
                {isEnabled ? (
                  <Text style={styles.title}>
                    {" "}
                    etat : {Detail && Detail.etat + "  "}
                  </Text>
                ) : (
                  <Text style={{ color: "red", fontSize: 24 }}>
                    <Text style={styles.title}> etat : </Text>indisponible
                  </Text>
                )}
              </View>
              <View>
                <Switch
                  rackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                  onValueChange={() => toggleSwitch()}
                  value={isEnabled}
                />
              </View>
            </View>

            <Text style={styles.title}>nom : {Detail && Detail.nom}</Text>
          </View>
        )}
      </View>
    </NativeBaseProvider>
  );
}
// export default () => {
//   return (
//     <NativeBaseProvider>
//       <DetailProduit />
//     </NativeBaseProvider>
//   );
// };
export default DetailProduit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  Button: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 2,
    backgroundColor: "#ACDA4E",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },

  ImageX: {
    //height:'10%',
    alignItems: "center",
    height: Screen.width - 40 - 6,
    width: Screen.width - 40 - 6,
  },
  BiText: {
    fontFamily: "monospace",
    color: "#344372",
    paddingBottom: 20,
    fontSize: 14,
  },
  Bi1Text: {
    fontFamily: "monospace",
    color: "#344372",
    fontSize: 14,
  },
  list__container: {
    margin: 10,
    height: "45%",
    width: "100%",
  },
  item: {
    alignItems: "center",
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
    color: "black",
  },
});
