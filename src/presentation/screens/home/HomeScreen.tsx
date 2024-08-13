import {useAuthStore} from '../../store/auth/useAuthStore';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';
import {useInfiniteQuery} from '@tanstack/react-query';
import {MainLayout} from '../../layouts/MainLayout';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {ProductList} from '../../components/products/ProductList';
import {FAB} from '../../components/ui/FAB';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  const {logout} = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    queryFn: async params => {
      return await getProductsByPage(params.pageParam);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  // const {isLoading, data: products = []} = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProductsByPage(0),
  // });

  return (
    <>
      <MainLayout
        title="TesloShop - Products"
        subTitle="Aplicación administrativa"
        rightAction={() => logout()}
        rightActionIcon="log-out-outline">
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductList
            fetchNextPage={fetchNextPage}
            products={data?.pages.flat() ?? []}
          />
        )}
      </MainLayout>
      <FAB
        style={{position: 'absolute', bottom: 20, right: 30}}
        onPress={() => navigation.navigate('ProductScreen', {productId: 'new'})}
        iconName="plus"
      />
    </>
  );
};
