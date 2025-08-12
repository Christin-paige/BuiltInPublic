import { URL } from 'url';
import * as net from 'net';
import * as dns from 'dns/promises';

interface ValidationOptions {
  allowedProtocols?: string[];
  allowedDomains?: string[];
  blockedDomains?: string[];
  allowLocalhost?: boolean;
  allowPrivateIPs?: boolean;
  maxUrlLength?: number;
  allowSubdomains?: boolean;
  allowPorts?: boolean;
  allowedPorts?: number[];
  checkDNS?: boolean;
  allowDataUrls?: boolean;
  allowFileUrls?: boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedUrl?: string;
  urlComponents?: {
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
  };
}

export class SecureURLValidator {
  private readonly defaultOptions: ValidationOptions = {
    allowedProtocols: ['https:', 'http:'],
    allowLocalhost: false,
    allowPrivateIPs: false,
    maxUrlLength: 2048,
    allowSubdomains: true,
    allowPorts: false,
    allowedPorts: [80, 443],
    checkDNS: false,
    allowDataUrls: false,
    allowFileUrls: false,
  };

  private readonly options: ValidationOptions;

  // Common malicious patterns
  private readonly maliciousPatterns = [
    /javascript:/i,
    /vbscript:/i,
    /onclick/i,
    /onerror/i,
    /onload/i,
    /<script/i,
    /data:text\/html/i,
    /data:application\/x-httpd-php/i,
  ];

  // Private IP ranges (RFC 1918)
  private readonly privateIPRanges = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^127\./,
    /^169\.254\./,
    /^::1$/,
    /^fc00:/i,
    /^fe80:/i,
  ];

  // Known malicious TLDs and domains (extend as needed)
  private readonly suspiciousTLDs = [
    '.tk',
    '.ml',
    '.ga',
    '.cf',
    '.click',
    '.download',
    '.racing',
    '.review',
  ];

  constructor(options: ValidationOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  /**
   * Main validation method
   */
  public async validate(urlString: string): Promise<ValidationResult> {
    const errors: string[] = [];

    // Basic input validation
    if (!urlString || typeof urlString !== 'string') {
      return {
        isValid: false,
        errors: ['URL must be a non-empty string'],
      };
    }

    // Trim and check length
    const trimmedUrl = urlString.trim();
    if (trimmedUrl.length > this.options.maxUrlLength!) {
      errors.push(
        `URL exceeds maximum length of ${this.options.maxUrlLength} characters`
      );
    }

    // Check for malicious patterns
    for (const pattern of this.maliciousPatterns) {
      if (pattern.test(trimmedUrl)) {
        errors.push(
          `URL contains potentially malicious pattern: ${pattern.source}`
        );
      }
    }

    // Check for null bytes
    if (trimmedUrl.includes('\0') || trimmedUrl.includes('%00')) {
      errors.push('URL contains null byte injection attempt');
    }

    // Parse URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(trimmedUrl);
    } catch (error) {
      return {
        isValid: false,
        errors: ['Invalid URL format'],
      };
    }

    // Validate protocol
    if (!this.validateProtocol(parsedUrl, errors)) {
      return { isValid: false, errors };
    }

    // Validate hostname
    if (!this.validateHostname(parsedUrl, errors)) {
      return { isValid: false, errors };
    }

    // Validate port
    if (!this.validatePort(parsedUrl, errors)) {
      return { isValid: false, errors };
    }

    // Check for suspicious TLDs
    this.checkSuspiciousTLDs(parsedUrl, errors);

    // Check against allowed/blocked domains
    if (!this.validateDomainRules(parsedUrl, errors)) {
      return { isValid: false, errors };
    }

    // Check for SSRF vulnerabilities
    if (!(await this.checkSSRF(parsedUrl, errors))) {
      return { isValid: false, errors };
    }

    // DNS resolution check (optional)
    if (this.options.checkDNS && !(await this.validateDNS(parsedUrl, errors))) {
      return { isValid: false, errors };
    }

    // Sanitize URL
    const sanitizedUrl = this.sanitizeUrl(parsedUrl);

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedUrl: errors.length === 0 ? sanitizedUrl : undefined,
      urlComponents: {
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        pathname: parsedUrl.pathname,
        search: parsedUrl.search,
        hash: parsedUrl.hash,
      },
    };
  }

  /**
   * Validate URL protocol
   */
  private validateProtocol(url: URL, errors: string[]): boolean {
    // Check for data URLs
    if (url.protocol === 'data:' && !this.options.allowDataUrls) {
      errors.push('Data URLs are not allowed');
      return false;
    }

    // Check for file URLs
    if (url.protocol === 'file:' && !this.options.allowFileUrls) {
      errors.push('File URLs are not allowed');
      return false;
    }

    if (!this.options.allowedProtocols?.includes(url.protocol)) {
      errors.push(`Protocol ${url.protocol} is not allowed`);
      return false;
    }

    return true;
  }

  /**
   * Validate hostname
   */
  private validateHostname(url: URL, errors: string[]): boolean {
    const hostname = url.hostname.toLowerCase();

    // Check for empty hostname
    if (!hostname) {
      errors.push('Hostname is required');
      return false;
    }

    // Check for localhost
    if (
      !this.options.allowLocalhost &&
      (hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '[::1]')
    ) {
      errors.push('Localhost URLs are not allowed');
      return false;
    }

    // Check for IP addresses
    if (net.isIP(hostname)) {
      // Check for private IPs
      if (!this.options.allowPrivateIPs) {
        for (const range of this.privateIPRanges) {
          if (range.test(hostname)) {
            errors.push('Private IP addresses are not allowed');
            return false;
          }
        }
      }
    }

    // Check for IDN homograph attacks
    if (hostname.includes('xn--')) {
      errors.push(
        'Internationalized domain names require additional validation'
      );
      // You might want to implement punycode validation here
    }

    return true;
  }

  /**
   * Validate port
   */
  private validatePort(url: URL, errors: string[]): boolean {
    if (url.port) {
      if (!this.options.allowPorts) {
        errors.push('Custom ports are not allowed');
        return false;
      }

      const port = parseInt(url.port);
      if (
        this.options.allowedPorts &&
        !this.options.allowedPorts.includes(port)
      ) {
        errors.push(`Port ${port} is not allowed`);
        return false;
      }
    }

    return true;
  }

  /**
   * Check for suspicious TLDs
   */
  private checkSuspiciousTLDs(url: URL, errors: string[]): void {
    const hostname = url.hostname.toLowerCase();
    for (const tld of this.suspiciousTLDs) {
      if (hostname.endsWith(tld)) {
        errors.push(`Suspicious TLD detected: ${tld}`);
      }
    }
  }

  /**
   * Validate against allowed/blocked domain rules
   */
  private validateDomainRules(url: URL, errors: string[]): boolean {
    const hostname = url.hostname.toLowerCase();

    // Check blocked domains
    if (this.options.blockedDomains) {
      for (const blocked of this.options.blockedDomains) {
        if (this.matchesDomain(hostname, blocked)) {
          errors.push(`Domain ${hostname} is blocked`);
          return false;
        }
      }
    }

    // Check allowed domains (if specified, only these are allowed)
    if (this.options.allowedDomains && this.options.allowedDomains.length > 0) {
      let isAllowed = false;
      for (const allowed of this.options.allowedDomains) {
        if (this.matchesDomain(hostname, allowed)) {
          isAllowed = true;
          break;
        }
      }
      if (!isAllowed) {
        errors.push(`Domain ${hostname} is not in the allowed list`);
        return false;
      }
    }

    return true;
  }

  /**
   * Check if hostname matches domain (with optional subdomain support)
   */
  private matchesDomain(hostname: string, domain: string): boolean {
    domain = domain.toLowerCase();
    if (hostname === domain) {
      return true;
    }
    if (this.options.allowSubdomains) {
      return hostname.endsWith(`.${domain}`);
    }
    return false;
  }

  /**
   * Check for SSRF vulnerabilities
   */
  private async checkSSRF(url: URL, errors: string[]): Promise<boolean> {
    const hostname = url.hostname;

    // Check for AWS metadata endpoint
    if (hostname === '169.254.169.254') {
      errors.push('AWS metadata endpoint is not allowed');
      return false;
    }

    // Check for Google Cloud metadata endpoint
    if (hostname === 'metadata.google.internal') {
      errors.push('Google Cloud metadata endpoint is not allowed');
      return false;
    }

    // Check for common internal hostnames
    const internalHostnames = ['metadata', 'meta-data', 'instance-data'];
    if (internalHostnames.includes(hostname)) {
      errors.push('Internal metadata endpoints are not allowed');
      return false;
    }

    return true;
  }

  /**
   * Validate DNS resolution
   */
  private async validateDNS(url: URL, errors: string[]): Promise<boolean> {
    try {
      const addresses = await dns.resolve4(url.hostname);
      if (addresses.length === 0) {
        errors.push('Domain does not resolve to any IP address');
        return false;
      }

      // Check resolved IPs against private ranges
      if (!this.options.allowPrivateIPs) {
        for (const address of addresses) {
          for (const range of this.privateIPRanges) {
            if (range.test(address)) {
              errors.push('Domain resolves to a private IP address');
              return false;
            }
          }
        }
      }
    } catch (error) {
      errors.push(`DNS resolution failed: ${(error as Error).message}`);
      return false;
    }

    return true;
  }

  /**
   * Sanitize URL for safe storage and usage
   */
  private sanitizeUrl(url: URL): string {
    // Remove credentials
    url.username = '';
    url.password = '';

    // Remove potentially dangerous characters from pathname
    url.pathname = url.pathname.replace(/[<>\"']/g, '');

    // Encode special characters in search params
    if (url.search) {
      const params = new URLSearchParams(url.search);
      const sanitizedParams = new URLSearchParams();

      for (const [key, value] of params.entries()) {
        // Remove any HTML/script content from parameters
        const sanitizedKey = key.replace(/[<>\"']/g, '');
        const sanitizedValue = value.replace(/[<>\"']/g, '');
        sanitizedParams.append(sanitizedKey, sanitizedValue);
      }

      url.search = sanitizedParams.toString();
    }

    // Remove hash if it contains suspicious content
    if (url.hash && /<|>|javascript:|vbscript:/i.test(url.hash)) {
      url.hash = '';
    }

    return url.toString();
  }

  /**
   * Batch validate multiple URLs
   */
  public async validateBatch(
    urls: string[]
  ): Promise<Map<string, ValidationResult>> {
    const results = new Map<string, ValidationResult>();

    for (const url of urls) {
      results.set(url, await this.validate(url));
    }

    return results;
  }

  /**
   * Update validator options
   */
  public updateOptions(options: Partial<ValidationOptions>): void {
    Object.assign(this.options, options);
  }
}
