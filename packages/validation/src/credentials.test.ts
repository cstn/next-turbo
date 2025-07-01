import { describe, expect, it } from "vitest";
import { Credentials } from "./credentials";

describe("Credentials validator", () => {
  it("should accept valid credentials", () => {
    const result = Credentials.safeParse({
      username: "validUsername",
      password: "validPassword",
    });
    expect(result.success).toBe(true);
  });

  it("should reject missing username", () => {
    const result = Credentials.safeParse({
      password: "validPassword",
    });
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("username.required");
  });

  it("should reject missing password", () => {
    const result = Credentials.safeParse({
      username: "validUsername",
    });
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe("password.required");
  });

  it("should reject empty credentials", () => {
    const result = Credentials.safeParse({});
    expect(result.success).toBe(false);
    expect(result.error?.errors).toHaveLength(2);
    expect(result.error?.errors.map((e) => e.message)).toContain("username.required");
    expect(result.error?.errors.map((e) => e.message)).toContain("password.required");
  });

  it("should reject invalid types", () => {
    const result = Credentials.safeParse({
      username: 123,
      password: true,
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors).toHaveLength(2);
    expect(result.error?.errors.map((e) => e.message)).toContain("username.required");
    expect(result.error?.errors?.map((e) => e.message)).toContain("password.required");
  });
});
