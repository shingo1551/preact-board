import { Profile, signIn, state } from "./store";

// const apiUrl = 'http://localhost:8000/api/';
// const apiUrl = "http://imac.local:8000/api/";
const apiUrl = "https://fresh-board.deno.dev/api/";

/*
export async function fetchCors(
  url: string,
  method: string,
  // deno-lint-ignore no-explicit-any
  body: any = undefined,
) {
  const jwt = state.value.jwt;
  const headers = jwt ? [["Authorization", "Bearer " + jwt]] : undefined;

  const o = body ? JSON.stringify(body) : undefined;
  const req = {
    method: method,
    headers: headers,
    mode: "cors" as RequestMode,
    cache: "no-cache" as RequestCache,
    body: o,
  } as RequestInit;

  const res = await fetch(apiUrl + url, req);
  if (!res.headers.get("content-type")?.startsWith("application/json")) {
    throw await res.text();
  }

  const json = await res.json() as { jwt: string; profile: Profile };
  if ("sign-in" === url) {
    signIn(json);
  }

  // deno-lint-ignore no-explicit-any
  return json as any;
}
*/

import { CapacitorHttp, HttpHeaders, HttpOptions } from "@capacitor/core";

export async function fetchCors(
  url: string,
  method: string,
  body: any = undefined,
) {
  const host = "https://fresh-board.deno.dev";
  const headers: HttpHeaders = {
    "content-type": "application/json",
    origin: host,
    referer: host,
  };

  const jwt = state.value.jwt;
  if (jwt) {
    headers.Authorization = "Bearer " + jwt;
  }

  const options: HttpOptions = {
    method: method,
    url: apiUrl + url,
    headers: headers,
    data: body,
    shouldEncodeUrlParams: false,
  };

  const res = await CapacitorHttp.request(options);

  if (res.data instanceof String) {
    throw res.data;
  }

  const json = await res.data as { jwt: string; profile: Profile };
  if ("sign-in" === url) {
    signIn(json);
  }

  return json as any;
}
