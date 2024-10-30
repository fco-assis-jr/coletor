// screens/ColetorScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ColetorScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);

  // Pede permissão para acessar a câmera
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Função que é chamada quando o código de barras é escaneado
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcode(data);
    setCameraOpen(false); // Fecha a câmera após o escaneamento
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera</Text>;
  }

  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} // Ajuste para garantir que o teclado não cubra os campos
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Tela de Coletor</Text>

        {cameraOpen ? (
          <View style={styles.scannerContainer}>
            {!scanned && (
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            <View style={styles.cameraFooter}>
              <TouchableOpacity
                style={styles.closeCameraButton}
                onPress={() => setCameraOpen(false)}
              >
                <Text style={styles.closeCameraButtonText}>Fechar Câmera</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Código de Barra"
              value={barcode}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.openCameraButton} onPress={() => { setScanned(false); setCameraOpen(true); }}>
              <Text style={styles.openCameraButtonText}>Abrir Câmera</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  openCameraButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  openCameraButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeCameraButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeCameraButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraFooter: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  scannerContainer: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ColetorScreen;
