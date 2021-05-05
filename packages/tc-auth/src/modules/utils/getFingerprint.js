import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fpPromise = FingerprintJS.load();

export async function getFingerprint() {
  const fp = await fpPromise;
  const result = await fp.get();

  return result.visitorId;
}
