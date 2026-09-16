export type ReplyPayload = {
  work_id: 'yuyuyeonyeon';
  work_type: 'poem-series';
  reply_version: 1;
  answer_lasting: string;
  answer_distance: string;
  answer_message: string;
  public_consent: boolean;
};

type Web3FormsResponse = {
  success?: boolean;
};

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = 'f20248d6-990b-4d49-bd09-c34555af12c3';
const SUBMISSION_TIMEOUT_MS = 15_000;

/**
 * Reply System v0.1 submission adapter.
 * Provider-specific request details stay here so the Reply UI can remain
 * independent from Web3Forms.
 */
export async function submitReply(payload: ReplyPayload): Promise<void> {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(
    () => controller.abort(),
    SUBMISSION_TIMEOUT_MS,
  );

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Reply — 유유연연',
        from_name: 'kimbyeonggwan.xyz',
        ...payload,
      }),
      signal: controller.signal,
    });

    let result: Web3FormsResponse;
    try {
      result = (await response.json()) as Web3FormsResponse;
    } catch {
      throw new Error('invalid-response');
    }

    if (!response.ok || result.success !== true) {
      throw new Error('submission-rejected');
    }
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}
