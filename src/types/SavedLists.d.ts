interface SavedList {
  id: string; // UUID
  user_id: string; // UUID del usuario que guarda la lista
  list_id: string; // UUID de la lista guardada
  created_at?: string; // Timestamp opcional
}

interface SavedListsDetails {
  saved_at: any;
  list_id: string;
  user_id: string;
  lists: {
    id: string;
    name: string;
    user_id: string;
  }[];
}
[] | null;
