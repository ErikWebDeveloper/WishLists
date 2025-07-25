import { useState, useEffect } from "react";
import { SupabaseService } from "../services/SupabaseService";
import delay from "../utils/delay";

const DELAY_TIME = 600;

export function useSavedLists() {
  const [savedLists, setSavedLists] = useState<SavedListsDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCRUD, setLoadingCRUD] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const service = new SupabaseService();

  useEffect(() => {
    const loadSavedLists = async () => {
      await delay(DELAY_TIME);
      try {
        const lists = await service.getSavedLists();
        console.log(lists);
        setSavedLists(lists);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Error loading saved lists")
        );
      } finally {
        setLoading(false);
      }
    };

    loadSavedLists();
  }, []);

  const saveList = async (listId: string) => {
    setLoadingCRUD(true);
    await delay(DELAY_TIME);
    try {
      await service.saveList(listId);
      const updated = await service.getSavedLists();
      setSavedLists(updated);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error saving list"));
    } finally {
      setLoadingCRUD(false);
    }
  };

  const unsaveList = async (listId: string) => {
    setLoadingCRUD(true);
    await delay(DELAY_TIME);
    try {
      await service.unsaveList(listId);
      const lists = await service.getSavedLists();
      setSavedLists(lists);
      //setSavedLists((prev) => prev.filter((l) => l.id !== listId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error unsaving list"));
    } finally {
      setLoadingCRUD(false);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return {
    savedLists,
    loading,
    loadingCRUD,
    error,
    saveList,
    unsaveList,
    clearErrors,
  };
}
