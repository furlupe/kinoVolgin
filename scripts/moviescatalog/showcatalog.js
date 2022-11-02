import { fillCatalog } from "./moviescatalog.js";
import { showPagination } from "./pagination.js";

export function showCatalogPage(page) {
    fillCatalog(page);
    showPagination(page);
}