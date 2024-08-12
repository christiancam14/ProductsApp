import {Layout, List, Text} from '@ui-kitten/components';
import {Product} from '../../../domain/entities/product';
import {ProductCard} from './ProductCard';
import {useState} from 'react';
import {RefreshControl} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';

interface Props {
  products: Product[];

  // TODO: Fetch nextPage
  fetchNextPage: () => void;
}

export const ProductList = ({products, fetchNextPage}: Props) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    // Sleep 2 segs
    await new Promise(resolve => setTimeout(resolve, 200));
    queryClient.invalidateQueries({queryKey: ['products', 'inifinte']});

    setIsRefreshing(false);
  };

  const sortedProducts = products.sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  return (
    <List
      data={sortedProducts}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard key={item.id} product={item} />}
      ListFooterComponent={() => <Layout style={{height: 150}} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
