// export interface Document {
//   id: number;
//   date?: string;
//   dateGMT?: string;
//   guid?: string;
//   modified?: string;
//   modifiedGMT?: string;
//   slug?: string;
//   status?: string;
//   type: string; // você já monta manualmente ex: "attachment - formularios"
//   link?: string;
//   title?: string;
//   description?: string;
//   caption?: string;
//   mediaType?: string;
//   mimeType?: string;
//   post?: number | string;
//   sourceUrl?: string;
// }

// export interface DocumentVersionTwo {
//     id: number,
//     title: string,
//     slug: string,
//     url: string,
//     pageUrl: string,
//     date: string,
//     mime_type: string,
//     type: string
// }


export type Document = {
  id: string        // hash MD5 gerado pela URL — diferente do Post que era number
  title: string
  url: string       // link direto para o arquivo PDF/DOC
  type: string      // "pdf", "doc", "docx"
  date: string | null
  slug: string
  pageOrigin: string // URL da página onde o documento foi encontrado
  category: string   // string legível — diferente do Post que usava number[]
}
