import { describe, expect, it } from "vitest";
import { Email } from "./email";

describe("Email validator", () => {
  it("should accept valid email", () => {
    const result = Email.safeParse("test@example.com");
    expect(result.success).toBe(true);
  });

  it("should reject invalid email format", () => {
    const result = Email.safeParse("invalid-email");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("email.required");
  });

  it("should reject empty email", () => {
    const result = Email.safeParse("");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("email.required");
  });

  it("should reject undefined email", () => {
    const result = Email.safeParse(undefined);
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("email.required");
  });
});
