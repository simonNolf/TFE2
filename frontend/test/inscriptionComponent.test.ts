import { isSqlInjectionSafe, isPasswordSecure } from '../src/components/InscriptionComponent';

test('isSqlInjectionSafe returns true for safe input', () => {
  expect(isSqlInjectionSafe("safeInput")).toBe(true);
});

test('isSqlInjectionSafe returns false for unsafe input', () => {
  expect(isSqlInjectionSafe("unsafeInput'")).toBe(false);
  expect(isSqlInjectionSafe("unsafeInput\"")).toBe(false);
});

test('isPasswordSecure returns true for secure password', () => {
  expect(isPasswordSecure("SecurePassword1#")).toBe(true);
});

test('isPasswordSecure returns false for insecure password', () => {
  expect(isPasswordSecure("weakpassword")).toBe(false);
  expect(isPasswordSecure("12345678")).toBe(false);
  expect(isPasswordSecure("WeakPassword#")).toBe(false);
});
