import { useEffect } from "react"
// Döküman İsmi değitirildi
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}