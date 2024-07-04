import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateJobForm from "../components/pages/CreateJobForm";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { expect, describe, test, vi } from "vitest";

vi.mock("next/navigation", async () => {
  return {
    useRouter: vi.fn(),
  };
});

vi.mock("@tanstack/react-query", async () => {
  return {
    useQueryClient: vi.fn(),
    useMutation: () => ({
      mutate: vi.fn(),
    }),
  };
});

describe("testing createJobForm", () => {
  test("testing createJobForm ui", async () => {
    render(<CreateJobForm />);
    const title = screen.getByTestId("title");
    expect(title).toBeDefined();
  });
});
