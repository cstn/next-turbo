import { describe, expect, it } from "vitest";
import { CredentialsSchema } from "./credentials";

describe("Credentials validator", () => {
  it("should accept valid credentials", () => {
    const result = CredentialsSchema.safeParse({
      username: "validUsername",
      password: "validPassword",
    });
    expect(result.success).toBe(true);
  });

  it("should reject missing username", () => {
    const result = CredentialsSchema.safeParse({
      password: "validPassword",
    });
    expect(result.success).toBe(false);
    expect(result?.error?.issues?.[0]?.message).toBe("username.required");
  });

  it("should reject missing password", () => {
    const result = CredentialsSchema.safeParse({
      username: "validUsername",
    });
    expect(result.success).toBe(false);
    expect(result?.error?.issues?.[0]?.message).toBe("password.required");
  });

  it("should reject empty credentials", () => {
    const result = CredentialsSchema.safeParse({});
    expect(result.success).toBe(false);
    expect(result.error?.issues).toHaveLength(2);
    expect(result.error?.issues.map((e) => e.message)).toContain("username.required");
    expect(result.error?.issues.map((e) => e.message)).toContain("password.required");
  });

  it("should reject invalid types", () => {
    const result = CredentialsSchema.safeParse({
      username: 123,
      password: true,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues).toHaveLength(2);
    expect(result.error?.issues.map((e) => e.message)).toContain("username.required");
    expect(result.error?.issues?.map((e) => e.message)).toContain("password.required");
  });
});
