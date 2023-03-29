import { describe, expect, test, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Conversions from "./Conversions";

describe("Conversions component", () => {
  const mockConversions = [
    { currency: "USD", value: 100 },
    { currency: "EUR", value: 50 },
    { currency: "GBP", value: 75 },
  ];
  let conversionElements = [];

  beforeEach(() => {
    render(<Conversions conversions={mockConversions} />);
  });

  return {
    get conversions(){
      const conversions = screen.getAllByTestId('conversion');
      return users.map(conversions => ({
        name: within(conversions)
          .getByRole('button').textContent,
        role: within(conversions).getByTestId('role').textContent,
      }));
    },
  }

  it('should render the users in sorted order', () => {
    const { conversions } = renderUsersList();
  
    expect(conversions).toEqual([
      { name: 'Dwight', role: 'Salesman' },
      { name: 'Pam', role: 'Receptionist' },
    ]);
  });

  test("should display the correct number of conversion elements", () => {
    conversionElements = screen.getAllByTestId("conversion");
    expect(conversionElements).toHaveLength(mockConversions.length);
  });
});
