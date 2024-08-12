import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {API_URL, STAGE} from '@env';
import {useState} from 'react';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setIsPosting(true);

    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);
    if (wasSuccessful) return;

    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  };

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
              onPress={onLogin}
              disabled={isPosting}
              accessoryRight={<MyIcon name="arrow-forward-outline" />}>
              Ingresar
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
            <Text>¿No tienes cuenta?</Text>
            <Button
              appearance="ghost"
              onPress={() => {
                navigation.navigate('RegisterScreen');
              }}>
              <Text status="primary" category="s1">
                Crea una
              </Text>
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
