import { describe, expect, it } from "vitest";
import { UsernameSchema, NewUsernameSchema } from "./username";

describe("Username validator", () => {
  it("should accept valid username", () => {
    const result = UsernameSchema.safeParse("validUsername");
    expect(result.success).toBe(true);
  });

  it("should reject empty username", () => {
    const result = UsernameSchema.safeParse("");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.required");
  });

  it("should reject invalid type", () => {
    const result = UsernameSchema.safeParse(1);
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.required");
  });

  it("should reject undefined username", () => {
    const result = UsernameSchema.safeParse(undefined);
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.required");
  });

});

describe("New Username validator", () => {
  it("should reject chars that are not allowed", () => {
    const result = NewUsernameSchema.safeParse('x&y');
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.invalid");
  });

  it("should reject short username", () => {
    const result = NewUsernameSchema.safeParse('xy');
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.minLength");
  });

  it("should reject very long username", () => {
    const result = NewUsernameSchema.safeParse(new Array(33).fill('x').join());
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.maxLength");
  });
});
