import CreateJobForm from "../components/pages/CreateJobForm";
import { render, screen } from "@testing-library/react";
import { expect, describe, test, vi } from "vitest";
import userEvents from "@testing-library/user-event";

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

const data = {
  position: "test position",
  company: "test company",
  location: "test location",
  jobStatus: "pending",
  jobMode: "full-time",
};

describe("testing createJobForm", () => {
  test("testing createJobForm ui", async () => {
    render(<CreateJobForm />);
    const title = screen.getByTestId("title");
    expect(title).toBeDefined();
  });

  test("testing submitting empty form", async () => {
    render(<CreateJobForm />);
    const Btns = screen.getAllByRole("button");
    expect(Btns[1].innerHTML).toBe("create job");
    await userEvents.click(Btns[1]);
    const paragrapghs = await screen.findAllByRole("paragraph");
    expect(paragrapghs).toHaveLength(3);
    expect(paragrapghs[0].innerHTML).toBe(
      "Position must be at least 10 characters."
    );
  });

  test("testing input values when user type to it", async () => {
    render(<CreateJobForm />);
    const inputs = await screen.findAllByRole("textbox");
    await userEvents.type(inputs[0], "key account manager");
    expect(inputs[0].getAttribute("value")).toBe("key account manager");
  });

  test("testing when submit the form with correct data", async () => {
    render(<CreateJobForm />);
    const Btns = screen.getAllByRole("button");
    const inputs = await screen.findAllByRole("textbox");
    for (let input of inputs) {
      await userEvents.type(input, "test data here");
    }
    await userEvents.click(Btns[1]);
    const paragrapghs = screen.queryAllByRole("paragraph");
    expect(paragrapghs).toHaveLength(0);
  });
});
