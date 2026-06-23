/** Objeto padrão do WP para campos { rendered: string } */
export interface WPRendered {
  rendered: string;
}

/** Link do WP */
export interface WPLinkObject {
  href: string;
}

/** Conjunto de links retornado pelo WP */
export interface WPLinks {
  self?: WPLinkObject[];
  collection?: WPLinkObject[];
  about?: WPLinkObject[];
  author?: WPLinkObject[];
  replies?: WPLinkObject[];
}

/** Tamanho de imagem dentro de media_details.sizes */
export interface WPSize {
  file?: string;
  width?: number;
  height?: number;
  mime_type?: string;
  source_url?: string;
}

/** Detalhes do arquivo de mídia */
export interface WPMediaDetails {
  filesize?: number;
  sizes?: Record<string, WPSize>;
}

/** Tipo principal para /wp/v2/media */
export interface WPAttachment {
  id: number;
  date?: string;
  date_gmt?: string;
  guid?: WPRendered;
  modified?: string;
  modified_gmt?: string;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  title?: WPRendered;
  author?: number;
  featured_media?: number;
  comment_status?: string;
  ping_status?: string;
  template?: string;

  meta?: {
    _seopress_robots_primary_cat: string;
    _seopress_titles_title: string;
    _seopress_titles_desc: string;
    _seopress_robots_index: string;
  };

  class_list?: string[];

  smush?: string;

  description?: WPRendered;
  caption?: WPRendered;
  alt_text?: string;

  media_type?: "file" | "image" | "video" | "audio";
  mime_type?: string;

  media_details?: WPMediaDetails;

  post?: number;

  source_url?: string;

  _links?: WPLinks;
}
