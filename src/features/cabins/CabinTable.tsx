import { useSearchParams } from 'react-router-dom';
import { useCabins } from './useCabins';

import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { ICabin } from './cabin.types';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';

type TSortableFields = 'name' | 'regularPrice' | 'maxCapacity';

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get('discount') ?? 'all';

  let filteredCabins: ICabin[] | undefined;
  if (filterValue === 'no-discount') {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === 'with-discount') {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  } else {
    filteredCabins = cabins;
  }

  // 2) SORTING
  const sortBy = searchParams.get('sortBy') ?? 'name-asc';
  const [field, direction] = sortBy.split('-') as [
    TSortableFields,
    'asc' | 'desc'
  ];
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (a[field] < b[field]) return -modifier;
    if (a[field] > b[field]) return modifier;
    return 0;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capactiy</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          dataArr={sortedCabins}
          render={(cabin: ICabin) => (
            <CabinRow key={cabin.name} cabin={cabin} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
