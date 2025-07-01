import { describe, expect, it } from "vitest";
import { Username, ComplexUsername } from "./username";

describe("Simple Username validator", () => {
  it("should accept valid username", () => {
    const result = Username.safeParse("validUsername");
    expect(result.success).toBe(true);
  });

  it("should reject empty username", () => {
    const result = Username.safeParse("");
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.required");
  });

  it("should reject undefined username", () => {
    const result = Username.safeParse(undefined);
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.required");
  });

});

describe("Username validator", () => {
  it("should reject chars that are not allowed", () => {
    const result = ComplexUsername.safeParse('x&y');
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.invalid");
  });

  it("should reject short username", () => {
    const result = ComplexUsername.safeParse('xy');
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.minLength");
  });

  it("should reject very long username", () => {
    const result = ComplexUsername.safeParse(new Array(33).fill('x').join());
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.maxLength");
  });
});
