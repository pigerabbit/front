import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterForm from "../RegisterForm";

jest.mock("react-router-dom");
jest.mock("axios");

describe("RegisterForm", () => {
  it("input 칸 4개가 만들어져야 한다.", async () => {
    render(<RegisterForm />);
    await screen.findAllByRole("textbox");

    const emailInput = screen.getByLabelText(/이메일/);
    const passwordInput = screen.getByLabelText(/^비밀번호$/);
    const confirmPasswordInput = screen.getByLabelText(/확인/);
    const nameInput = screen.getByLabelText(/이름/);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it("입력이 조건에 맞지 않을 시, 조건을 맞추라는 문구가 화면에 나타난다.", async () => {
    render(<RegisterForm />);
    await screen.findAllByRole("textbox");

    const emailInput = screen.getByLabelText(/이메일/);
    const passwordInput = screen.getByLabelText(/^비밀번호$/);
    const confirmPasswordInput = screen.getByLabelText(/확인/);
    const nameInput = screen.getByLabelText(/이름/);

    userEvent.type(emailInput, "abc@example");
    userEvent.type(passwordInput, "12");
    userEvent.type(confirmPasswordInput, "1");
    userEvent.type(nameInput, "엘");

    const conditionText1 = screen.getByText(/형식/);
    const conditionText2 = screen.getByText(/4글자/);
    const conditionText3 = screen.getByText(/일치/);
    const conditionText4 = screen.getByText(/2글자/);

    expect(conditionText1).toBeInTheDocument();
    expect(conditionText2).toBeInTheDocument();
    expect(conditionText3).toBeInTheDocument();
    expect(conditionText4).toBeInTheDocument();
  });

  it("입력의 조건 충족 여부에 따라, 제출 버튼이 활성화 혹은 비활성화된다", async () => {
    render(<RegisterForm />);
    await screen.findAllByRole("textbox");

    const emailInput = screen.getByLabelText(/이메일/);
    const passwordInput = screen.getByLabelText(/^비밀번호$/);
    const confirmPasswordInput = screen.getByLabelText(/확인/);
    const nameInput = screen.getByLabelText(/이름/);

    userEvent.type(emailInput, "abc@example");
    userEvent.type(passwordInput, "12");
    userEvent.type(confirmPasswordInput, "1");
    userEvent.type(nameInput, "엘");

    const submitButton = screen.getByRole("button", { name: "회원가입" });
    expect(submitButton).toBeDisabled();

    userEvent.type(emailInput, ".com");
    expect(submitButton).toBeDisabled();

    userEvent.type(passwordInput, "34");
    expect(submitButton).toBeDisabled();

    userEvent.type(confirmPasswordInput, "234");
    expect(submitButton).toBeDisabled();

    userEvent.type(nameInput, "리스");
    expect(submitButton).toBeEnabled();
  });

  it("제출 버튼 클릭 시, axios.post로 입력 데이터를 보낸다", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    axios.post.mockImplementation(userInfo => Promise.resolve(userInfo))

    render(<RegisterForm />);
    await screen.findAllByRole("textbox");

    const emailInput = screen.getByLabelText(/이메일/);
    const passwordInput = screen.getByLabelText(/^비밀번호$/);
    const confirmPasswordInput = screen.getByLabelText(/확인/);
    const nameInput = screen.getByLabelText(/이름/);

    userEvent.type(emailInput, "abc@example.com");
    userEvent.type(passwordInput, "1234");
    userEvent.type(confirmPasswordInput, "1234");
    userEvent.type(nameInput, "엘리스");

    const submitButton = screen.getByRole("button", { name: "회원가입" });
    userEvent.click(submitButton);

    const expectedBodyData = expect.objectContaining({
      email: "abc@example.com",
      password: "1234",
      name: "엘리스",
    });

    const postedBodyDataString = axios.post.mock.calls[0][1]
    const postedBodyData = JSON.parse(postedBodyDataString)
    expect(postedBodyData).toMatchObject(expectedBodyData);
  });

  it("회원가입 성공 시, navigate('/login') 함수가 실행된다.", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    axios.post.mockImplementation(userInfo => Promise.resolve(userInfo))

    render(<RegisterForm />);
    await screen.findAllByRole("textbox");

    const emailInput = screen.getByLabelText(/이메일/);
    const passwordInput = screen.getByLabelText(/^비밀번호$/);
    const confirmPasswordInput = screen.getByLabelText(/확인/);
    const nameInput = screen.getByLabelText(/이름/);

    userEvent.type(emailInput, "abc@example.com");
    userEvent.type(passwordInput, "1234");
    userEvent.type(confirmPasswordInput, "1234");
    userEvent.type(nameInput, "엘리스");

    const submitButton = screen.getByRole("button", { name: "회원가입" });
    userEvent.click(submitButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalled())

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
