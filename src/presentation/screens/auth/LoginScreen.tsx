import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export const LoginScreen = () => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        {/*  */}
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{marginBottom: 10}}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            style={{marginBottom: 10}}
          />

          {/* Space */}
          <Layout style={{height: 20}} />

          {/* Button */}
          <Layout>
            <Button onPress={() => {}}>Ingresar</Button>
          </Layout>

          {/* Información para crear cuenta */}
          <Layout style={{height: 50}} />
          <Layout
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
            }}>
            <Text>¿No tienes cuenta?</Text>
            <Text status="primary" category="s1" onPress={() => {}}>
              Crea una
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
