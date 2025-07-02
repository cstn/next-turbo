import { describe, expect, it } from "vitest";
import { EmailSchema } from "./email";

describe("Email validator", () => {
  it("should accept valid email", () => {
    const result = EmailSchema.safeParse("test@example.com");
    expect(result.success).toBe(true);
  });

  it("should reject invalid email format", () => {
    const result = EmailSchema.safeParse("invalid-email");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("email.required");
  });

  it("should reject empty email", () => {
    const result = EmailSchema.safeParse("");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("email.required");
  });

  it("should reject undefined email", () => {
    const result = EmailSchema.safeParse(undefined);
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("email.required");
  });
});
