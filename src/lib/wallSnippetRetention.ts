/** Matches HabiMate API `WALL_SNIPPET_TTL_DAYS` (default 2). Photo snippets only. */
export const WALL_SNIPPET_PHOTO_TTL_DAYS = 2;

export const WALL_SNIPPET_PHOTO_RETENTION_SHORT =
  `Photo snippets on the Wall are removed automatically after ${WALL_SNIPPET_PHOTO_TTL_DAYS} days.`;

export const WALL_SNIPPET_PHOTO_RETENTION_DETAIL =
  `Wall photos (receipts, pics, screenshots) are deleted after ${WALL_SNIPPET_PHOTO_TTL_DAYS} days. Text notes and polls stay until someone removes them.`;
