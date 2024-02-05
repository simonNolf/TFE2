import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Tab1 from './pages/Tab1';

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

test('rendrer bonjour Simon', async () => {
  const { findByText } = render (<Tab1 />);
  await findByText('Bonjour Simon')
})
