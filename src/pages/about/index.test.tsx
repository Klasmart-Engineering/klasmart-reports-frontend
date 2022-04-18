import { render, screen } from "@testing-library/react";
import React from "react";
import AboutPage from "./index";

describe(`ListItem`, () => {
  describe(`Render`, () => {
      test(`default props`, () => {
          render(<AboutPage />);

          const titleEl = screen.getByText(`About`);
          
          expect(titleEl).toHaveTextContent(`About`);
      })
  });
})
