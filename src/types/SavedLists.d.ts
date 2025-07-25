interface SavedList {
  id: string; // UUID
  user_id: string; // UUID del usuario que guarda la lista
  list_id: string; // UUID de la lista guardada
  created_at?: string; // Timestamp opcional
}

interface SavedListView {
  list_id: string;
  list_name: string;
}
