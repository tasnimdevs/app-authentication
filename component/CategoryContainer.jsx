import React, { useState } from 'react';
import { View } from 'react-native';
import CategoryPage from './CategoryPage';
import CatesList from './CatesList';

const CategoryContainer = () => {
  const [totalBalance, setTotalBalance] = useState(0);

  return (
    <View>
      <CategoryPage setTotalBalance={setTotalBalance} />
      {/* Pass totalBalance as a prop to CatesList */}
      <CatesList totalBalance={totalBalance} />
    </View>
  );
};

export default CategoryContainer;
