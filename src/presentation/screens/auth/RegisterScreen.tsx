import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {useState} from 'react';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {register} = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const {height} = useWindowDimensions();

  const onRegister = async () => {
    if (
      form.email.length === 0 ||
      form.password.length === 0 ||
      form.fullName.length === 0
    ) {
      return;
    }

    setIsPosting(true);

    const wasSuccessful = await register(
      form.email,
      form.password,
      form.fullName,
    );
    setIsPosting(false);
    if (wasSuccessful) return;

    Alert.alert('Error', 'Hubo un problema al crear el usuario. Intente de nuevo');
  };

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
            value={form.fullName}
            onChangeText={fullName => setForm({...form, fullName})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="person-outline" />}
          />
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="email-outline" />}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={password => setForm({...form, password})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="lock-outline" />}
          />

          {/* Space */}
          <Layout style={{height: 10}} />

          {/* Button */}
          <Layout>
            <Button
              onPress={onRegister}
              disabled={isPosting}
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
