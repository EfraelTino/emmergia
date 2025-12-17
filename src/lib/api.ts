// src/lib/api.ts
const WP_GRAPHQL_URL = `${import.meta.env.WP_DOMAIN}/graphql`;

export async function wpquery(query: string, variables: object = {}) {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error("Error al conectar con WordPress");
  }

  const json = await res.json();
  return json.data;
}