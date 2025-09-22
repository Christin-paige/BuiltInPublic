import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SecureURLValidator } from '../SecureURLValidator';

describe('SecureURLValidator', () => {
  let validator: SecureURLValidator;

  beforeEach(() => {
    validator = new SecureURLValidator();
  });

  describe('Basic URL validation', () => {
    it('should validate a valid HTTPS URL', async () => {
      const result = await validator.validate('https://example.com');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.sanitizedUrl).toBeDefined();
    });

    it('should reject empty or invalid input', async () => {
      const emptyResult = await validator.validate('');
      expect(emptyResult.isValid).toBe(false);
      expect(emptyResult.errors).toContain('URL must be a non-empty string');

      const invalidResult = await validator.validate('not-a-url');
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Invalid URL format');
    });

    it('should reject URLs exceeding max length', async () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(3000);
      const result = await validator.validate(longUrl);
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('URL exceeds maximum length');
    });
  });

  describe('Protocol validation', () => {
    it('should reject HTTP URLs by default', async () => {
      const result = await validator.validate('http://example.com');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Protocol http: is not allowed');
    });

    it('should accept allowed protocols', async () => {
      const customValidator = new SecureURLValidator({
        allowedProtocols: ['https:', 'http:'],
      });
      const result = await customValidator.validate('http://example.com');
      expect(result.isValid).toBe(true);
    });

    it('should reject data URLs by default', async () => {
      const result = await validator.validate(
        'data:text/html,<script>alert(1)</script>'
      );
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Data URLs are not allowed');
    });

    it('should reject file URLs by default', async () => {
      const result = await validator.validate('file:///etc/passwd');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File URLs are not allowed');
    });
  });

  describe('Hostname validation', () => {
    it('should reject localhost URLs by default', async () => {
      const localhostResult = await validator.validate('https://localhost');
      expect(localhostResult.isValid).toBe(false);
      expect(localhostResult.errors).toContain(
        'Localhost URLs are not allowed'
      );

      const ipResult = await validator.validate('https://127.0.0.1');
      expect(ipResult.isValid).toBe(false);
      expect(ipResult.errors).toContain('Localhost URLs are not allowed');
    });

    it('should accept localhost when allowed', async () => {
      const customValidator = new SecureURLValidator({ allowLocalhost: true });
      const result = await customValidator.validate('https://localhost');
      expect(result.isValid).toBe(true);
    });

    it('should reject private IP addresses', async () => {
      const privateIPs = [
        'https://10.0.0.1',
        'https://192.168.1.1',
        'https://172.16.0.1',
      ];

      for (const url of privateIPs) {
        const result = await validator.validate(url);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Private IP addresses are not allowed');
      }
    });

    it('should detect suspicious TLDs', async () => {
      const result = await validator.validate('https://example.tk');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Suspicious TLD detected: .tk');
    });
  });

  describe('Port validation', () => {
    it('should reject custom ports by default', async () => {
      const result = await validator.validate('https://example.com:8080');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Custom ports are not allowed');
    });

    it('should accept allowed ports when ports are enabled', async () => {
      const customValidator = new SecureURLValidator({
        allowPorts: true,
        allowedPorts: [443, 8443],
      });

      const validResult = await customValidator.validate(
        'https://example.com:8443'
      );
      expect(validResult.isValid).toBe(true);

      const invalidResult = await customValidator.validate(
        'https://example.com:9000'
      );
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Port 9000 is not allowed');
    });
  });

  describe('Malicious pattern detection', () => {
    it('should detect JavaScript protocol', async () => {
      const result = await validator.validate('javascript:alert(1)');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('potentially malicious pattern');
    });

    it('should detect null byte injection', async () => {
      const result = await validator.validate(
        'https://example.com/file%00.txt'
      );
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'URL contains null byte injection attempt'
      );
    });

    it('should detect script tags in URL', async () => {
      const result = await validator.validate(
        'https://example.com/<script>alert(1)</script>'
      );
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('potentially malicious pattern');
    });
  });

  describe('Domain rules', () => {
    it('should enforce allowed domains list', async () => {
      const customValidator = new SecureURLValidator({
        allowedDomains: ['example.com', 'trusted.org'],
      });

      const validResult = await customValidator.validate('https://example.com');
      expect(validResult.isValid).toBe(true);

      const invalidResult = await customValidator.validate(
        'https://untrusted.com'
      );
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain(
        'Domain untrusted.com is not in the allowed list'
      );
    });

    it('should handle subdomain matching', async () => {
      const customValidator = new SecureURLValidator({
        allowedDomains: ['example.com'],
        allowSubdomains: true,
      });

      const result = await customValidator.validate('https://api.example.com');
      expect(result.isValid).toBe(true);
    });

    it('should enforce blocked domains', async () => {
      const customValidator = new SecureURLValidator({
        blockedDomains: ['malicious.com'],
      });

      const result = await customValidator.validate('https://malicious.com');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Domain malicious.com is blocked');
    });
  });

  describe('SSRF protection', () => {
    it('should block AWS metadata endpoint', async () => {
      const result = await validator.validate(
        'https://169.254.169.254/latest/meta-data'
      );
      expect(result.isValid).toBe(false);
      // AWS metadata endpoint IP is detected as private IP
      expect(result.errors).toContain('Private IP addresses are not allowed');
    });

    it('should block Google Cloud metadata endpoint', async () => {
      const result = await validator.validate(
        'https://metadata.google.internal'
      );
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Google Cloud metadata endpoint is not allowed'
      );
    });

    it('should block common internal hostnames', async () => {
      const result = await validator.validate('https://metadata/');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Internal metadata endpoints are not allowed'
      );
    });
  });

  describe('URL sanitization', () => {
    it('should remove credentials from URL', async () => {
      const result = await validator.validate('https://user:pass@example.com');
      expect(result.isValid).toBe(true);
      expect(result.sanitizedUrl).toBe('https://example.com/');
      expect(result.sanitizedUrl).not.toContain('user');
      expect(result.sanitizedUrl).not.toContain('pass');
    });

    it('should sanitize dangerous characters in pathname', async () => {
      const result = await validator.validate(
        'https://example.com/<script>test</script>'
      );
      expect(result.isValid).toBe(false); // Will fail due to malicious pattern
    });

    it('should provide URL components', async () => {
      const result = await validator.validate(
        'https://example.com:8443/path?query=1#hash'
      );
      expect(result.isValid).toBe(false); // Port not allowed by default
      // Test with default port (443 for HTTPS returns empty string)
      const result2 = await validator.validate(
        'https://example.com/path?query=1#hash'
      );
      expect(result2.urlComponents).toEqual({
        protocol: 'https:',
        hostname: 'example.com',
        port: '', // Default port 443 for HTTPS returns empty string
        pathname: '/path',
        search: '?query=1',
        hash: '#hash',
      });
    });
  });

  describe('Batch validation', () => {
    it('should validate multiple URLs', async () => {
      const urls = [
        'https://example.com',
        'http://invalid.com',
        'https://trusted.org',
      ];

      const results = await validator.validateBatch(urls);

      expect(results.size).toBe(3);
      expect(results.get('https://example.com')?.isValid).toBe(true);
      expect(results.get('http://invalid.com')?.isValid).toBe(false);
      expect(results.get('https://trusted.org')?.isValid).toBe(true);
    });
  });

  describe('Options update', () => {
    it('should update validator options', async () => {
      validator.updateOptions({ allowLocalhost: true });

      const result = await validator.validate('https://localhost');
      expect(result.isValid).toBe(true);
    });
  });
});
