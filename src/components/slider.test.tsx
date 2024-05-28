/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import ThemeSlider from './theme-slider';

const THEME_COUNT_MOCK = {
  dropdownOpenHandler: jest.fn(),
  preventOpenHandler: jest.fn(),
};

describe('ThemeSlider component', () => {
  it('themes count', async () => {
    // Arrange ...
    const { dropdownOpenHandler, preventOpenHandler } = THEME_COUNT_MOCK;

    // Act
    render(
      <ThemeSlider
        dropdownOpenHandler={dropdownOpenHandler}
        preventOpenHandler={preventOpenHandler}
      />
    );

    // Assert
    const items = await screen.findAllByRole('button');

    expect(items).toHaveLength(3);
  });
});
