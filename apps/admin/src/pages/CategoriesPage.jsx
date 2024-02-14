import ServiceCategory from '@components/ServiceCategory';
import React from 'react';
import styled from 'styled-components';

function CategoriesPage() {
  return (
    <Wrapper>
      <ServiceCategory />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
`;

export default CategoriesPage;
