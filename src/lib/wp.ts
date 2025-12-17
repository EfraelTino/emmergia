import { wpquery } from './api'; // Importamos el helper de arriba

export const getPageInfo = async (slug: string) => {
  // Nota: En WPGraphQL, el slug suele buscarse como URI
  const query = `
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
      }
    }
  `;

  const data = await wpquery(query, { slug });
  
  // Si no existe la página, data.page será null
  if (!data.page) {
     throw new Error("Página no encontrada");
  }

  return data.page; // Retorna directamente { title: "...", content: "..." }
}

export const getAllMenus = async () => {
  const query = `
    query GetAllPagesLinks {
      pages(where: { orderby: { field: DATE, order: ASC } }) {
        nodes {
          title
          slug
        }
      }
    }
  `;
  const data = await wpquery(query);
  return data.pages.nodes;
}