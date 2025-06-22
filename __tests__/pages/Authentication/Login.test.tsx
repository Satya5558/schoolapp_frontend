import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import { Login } from "../../../src/pages/Authentication";
import queryClient from "../../../src/services/queryClient";
import store from "../../../src/store";

describe("Login", () => {
  beforeAll(() => {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
  });

  it("should render the login page", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const loginElement = screen.getByRole("button", { name: /Login/ });
    expect(loginElement).toBeInTheDocument();
  });
});
