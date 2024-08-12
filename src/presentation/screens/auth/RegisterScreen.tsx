import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/*  */}
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Nombre completo"
            autoCapitalize="none"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="person-outline" />}
          />
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="email-outline" />}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="lock-outline" />}
          />

          {/* Space */}
          <Layout style={{height: 10}} />

          {/* Button */}
          <Layout>
            <Button
              onPress={() => {}}
              accessoryRight={<MyIcon name="arrow-forward-outline" />}>
              Crear cuenta
            </Button>
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
            <Text>¿Ya tienes cuenta?</Text>
            <Button
              appearance="ghost"
              onPress={() => {
                navigation.goBack();
              }}>
              <Text status="primary" category="s1">
                Ingresar
              </Text>
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
