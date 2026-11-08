class PublicPage {
  AUTH = '/auth';

  HOME = '/';
 
  SEARCH(searchTerm: string) {
    return `/s?term=${searchTerm}`;
  }
}

export const PUBLIC_PAGE = new PublicPage()