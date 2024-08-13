import {useRef} from 'react';
import {ScrollView} from 'react-native';
import {MainLayout} from '../../layouts/MainLayout';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {RootStackParams} from '../../navigation/StackNavigator';

import {getProductById, updateCreateProduct} from '../../../actions/products';

import {StackScreenProps} from '@react-navigation/stack';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {Product} from '../../../domain/entities/product';
import {MyIcon} from '../../components/ui/MyIcon';
import {Formik} from 'formik';
import {ProductImages} from '../../components/products/ProductImages';
import {genders, sizes} from '../../../config/constants/constants';
import {CameraAdapter} from '../../../config/adapters/camera-adapter';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: Props) => {
  // const route = useRoute<RouteProp<RootStackParams, 'ProductScreen'>>();
  const theme = useTheme();
  const productIdRef = useRef(route.params.productId);
  const queryClient = useQueryClient();

  const {data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProductById(productIdRef.current),
  });

  // useMutation
  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess(data: Product) {
      productIdRef.current = data.id; // Creación

      queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['product', data.id]});
      // queryClient.setQueryData(['product', data.id], data);
    },
  });

  if (!product) {
    return <MainLayout title="Cargando..."></MainLayout>;
  }

  return (
    <Formik initialValues={product} onSubmit={mutation.mutate}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
        <MainLayout
          title={values.title}
          subTitle={`${values.price}`}
          rightAction={async () => {
            const photos = await CameraAdapter.getPicturesFromLibrary();
            setFieldValue('images', [...values.images, ...photos]);
          }}
          rightActionIcon="camera-outline">
          <ScrollView style={{flex: 1}}>
            {/* Imagenes del producto */}
            <Layout
              style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Tener en consideración cuando no hay imágenes */}
              <ProductImages images={values.images} />
            </Layout>

            {/* Formulario */}
            <Layout style={{marginHorizontal: 10}}>
              <Input
                label="Título"
                value={values.title}
                style={{marginVertical: 5}}
                onChangeText={handleChange('title')}
              />
              <Input
                label="Slug"
                value={values.slug}
                style={{marginVertical: 5}}
                onChangeText={handleChange('slug')}
              />
              <Input
                label="Descripción"
                multiline
                numberOfLines={5}
                value={values.description}
                style={{marginVertical: 5}}
                onChangeText={handleChange('description')}
              />
            </Layout>

            {/* Precio inventario */}
            <Layout
              style={{
                marginVertical: 5,
                marginHorizontal: 15,
                flexDirection: 'row',
                gap: 10,
              }}>
              <Input
                label="Precio"
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                keyboardType="number-pad"
                style={{flex: 1}}
              />
              <Input
                label="Inventario"
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                style={{flex: 1}}
                keyboardType="number-pad"
              />
            </Layout>

            {/* Selectores */}
            <ButtonGroup
              style={{margin: 2, marginTop: 30, marginHorizontal: 15}}
              size="small"
              appearance="outline">
              {sizes.map(size => (
                <Button
                  key={size}
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}>
                  {size}
                </Button>
              ))}
            </ButtonGroup>

            <ButtonGroup
              style={{margin: 2, marginTop: 30, marginHorizontal: 15}}
              size="small"
              appearance="outline">
              {genders.map(gender => (
                <Button
                  key={gender}
                  onPress={() => setFieldValue('gender', gender)}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-200']
                      : undefined,
                  }}>
                  {gender}
                </Button>
              ))}
            </ButtonGroup>

            {/* Botón de guardar */}
            <Button
              accessoryLeft={<MyIcon name="save-outline" white />}
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}
              style={{margin: 15}}>
              Guardar
            </Button>

            {/* Espaciado inferior */}
            <Layout style={{height: 200}} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
