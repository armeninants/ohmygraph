/**
 * @file Application settings.
 */

export const AJAX_TIMEOUT_MS = 30000
export const DEFAULT_SPARQL_ENDPOINT = 'https://dbpedia.org/sparql'
export const SITE_NAME = 'SemanticWeb.rocks'
export const TITLE_TEMPLATE = (str) => { return SITE_NAME + ' | ' + str }

export const URI_LENGTH_MAX = 60
export const DEFAULT_LANG = '' // empty string for no language preferance
