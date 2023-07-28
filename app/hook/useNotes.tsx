import { NoteContext } from "@/context/NotesContext";
import { useContext } from "react";

export function useNotes() {
 const context = useContext(NoteContext);
 if (!context) {
   throw new Error("useNotes must be used within a NotesProvider");
 }
 return context;
}