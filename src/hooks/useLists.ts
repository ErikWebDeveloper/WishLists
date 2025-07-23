import { useState, useEffect } from "react";
//import { LocalStorageService } from "../services/LocalStorageService";
import { SupabaseService } from "../services/SupabaseService";
import delay from "../utils/delay";
const DELAY_TIME = 600;

export function useLists() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCRUD, setLoadingCRUD] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  //const service = new LocalStorageService();
  const service = new SupabaseService();

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      await delay(DELAY_TIME);
      try {
        const [loadedLists] = await Promise.all([service.getLists()]);
        setLists(loadedLists);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error loading data"));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Operaciones para listas
  const addList = async (list: List) => {
    setLoadingCRUD(true);
    await delay(DELAY_TIME);
    const isPublicList = list.is_public ? true : false;
    const addList = { ...list, is_public: isPublicList };
    try {
      const newList = await service.addList(addList);
      setLists((prev) => [...prev, newList]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error adding list"));
    } finally {
      setLoadingCRUD(false);
    }
  };

  const deleteList = async (listId: string) => {
    setLoadingCRUD(true);
    await delay(DELAY_TIME);

    try {
      await service.deleteList(listId);
      const updatedLists = await service.getLists();
      setLists(updatedLists);
      //setLists((prev) => prev.filter((l) => l.id !== listId));
      //setWishes((prev) => prev.filter((w) => w.listId !== listId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error deleting list"));
    } finally {
      setLoadingCRUD(false);
    }
  };

  const updateList = async (list: List) => {
    setLoadingCRUD(true);
    await delay(DELAY_TIME);

    try {
      await service.updateList(list);
      setLists((prev) => prev.map((l) => (l.id === list.id ? list : l)));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error updating list"));
    } finally {
      setLoadingCRUD(false);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return {
    lists,
    loading,
    loadingCRUD,
    error,
    addList,
    deleteList,
    updateList,
    clearErrors,
  };
}
