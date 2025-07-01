import { describe, expect, it } from "vitest";
import { Password, ComplexPassword } from "./password";

describe("Password validator", () => {
  it("should accept valid password", () => {
    const result = Password.safeParse("password123");
    expect(result.success).toBe(true);
  });

  it("should reject empty password", () => {
    const result = Password.safeParse("");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("password.required");
  });

  it("should reject undefined password", () => {
    const result = Password.safeParse(undefined);
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("password.required");
  });
});

describe("ComplexPassword validator", () => {
  it("should accept valid complex password", () => {
    const result = ComplexPassword.safeParse("Password1!");
    expect(result.success).toBe(true);
  });

  it("should reject password shorter than 8 characters", () => {
    const result = ComplexPassword.safeParse("Pass1!");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("password.invalid");
  });

  it("should reject password without uppercase", () => {
    const result = ComplexPassword.safeParse("password1!");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("password.invalid");
  });

  it("should reject password without lowercase", () => {
    const result = ComplexPassword.safeParse("PASSWORD1!");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("password.invalid");
  });

  it("should reject password without numbers", () => {
    const result = ComplexPassword.safeParse("Password!!");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("password.invalid");
  });

  it("should reject password without special characters", () => {
    const result = ComplexPassword.safeParse("Password12");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("password.invalid");
  });

  it("should reject empty password", () => {
    const result = ComplexPassword.safeParse("");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("password.required");
  });
});
