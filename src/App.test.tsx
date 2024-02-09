import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

test('rendrer first tab', async () => {
  const { findByText } = render (<Tab1 />);
  await findByText('Bonjour Simon !')
})

test('rendrer second tab', async () => {
  const { findByText } = render (<Tab2 />);
  await findByText('Bonjour Simon !!')
})

test('rendrer third tab', async () => {
  const { findByText } = render (<Tab3 />);
  await findByText('Bonjour Simon !!!')
})

