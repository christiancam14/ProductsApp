import {Card, Text} from '@ui-kitten/components';
import {Product} from '../../../domain/entities/product';
import {Image, useColorScheme} from 'react-native';
import {FadeInImage} from '../ui/FadeInImage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import * as eva from '@eva-design/eva';

interface Props {
  product: Product;
}

export const ProductCard = ({product}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <Card
      style={{flex: 1, backgroundColor: '#f9f9f9', margin: 3}}
      onPress={() =>
        navigation.navigate('ProductScreen', {productId: product.id})
      }>
      {product.images.length === 0 ? (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={{width: '100%', height: 200}}
        />
      ) : (
        <FadeInImage
          uri={product.images[0]}
          style={{flex: 1, height: 200, width: '100%'}}
        />
      )}
      <Text
        numberOfLines={2}
        style={{textAlign: 'center', color: theme['color-basic-800']}}>
        {product.title}
      </Text>
    </Card>
  );
};
