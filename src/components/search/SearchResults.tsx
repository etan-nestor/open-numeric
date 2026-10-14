"use client";

import type { SearchResponse } from "@/types";
import { SearchResultItem } from ".";

interface SearchResultsProps {
  response: SearchResponse;
  onClose: () => void;
}

export default function SearchResults({
  response,
  onClose,
}: SearchResultsProps) {
  if (response.results.length === 0) return null;

  return (
    <ul role="list" className="p-2">
      {response.results.map((result) => (
        <li key={`${result.type}-${result.id}`}>
          <SearchResultItem result={result} onClose={onClose} />
        </li>
      ))}
    </ul>
  );
}