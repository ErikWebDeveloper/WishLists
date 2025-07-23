import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LocalStorageService } from "../services/LocalStorageService";
import { SupabaseService } from "../services/SupabaseService";

import delay from "../utils/delay";
const DELAY_TIME = 1000;

export function useWishes() {
  const { listId } = useParams();
  const [listName, setListName] = useState<string | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCRUD, setLoadingCRUD] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  //const service = new LocalStorageService();
  const service = new SupabaseService();

  const getWishesList = async (id: string) => {
    const wishesList = await service.getWishesByListId(id);
    setWishes(wishesList);
    setLoading(false);
  };

  const getListName = async (id: string) => {
    const list = await service.getListById(id);
    if (!list) return;
    setListName(list.name);
  };

  useEffect(() => {
    if (listId) {
      getListName(listId);
      getWishesList(listId);
      setLoading(false);
    }
  }, [listId]);

  // Operaciones para deseos
  const addWish = async (wish: Wish) => {
    setLoadingCRUD(true);
    await delay(DELAY_TIME);
    try {
      if (listId) {
        const newWish = { ...wish, listId };
        const wishInserted = await service.addWish(newWish);
        setWishes((prev) => [...prev, wishInserted]);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error adding wish"));
    } finally {
      setLoadingCRUD(false);
    }
  };

  const deleteWish = async (wishId: string) => {
    setLoadingCRUD(true);
    await delay(DELAY_TIME);
    try {
      //const wishToDelete = wishes.find((w) => w.id === wishId);
      //if (!wishToDelete) return;

      await service.deleteWish(wishId);
      if (!listId) return;
      const wishes = await service.getWishesByListId(listId);
      setWishes(wishes);
      //setWishes((prev) => prev.filter((w) => w.id !== wishId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error deleting wish"));
    } finally {
      setLoadingCRUD(false);
    }
  };

  const updateWish = async (wish: Wish) => {
    setLoadingCRUD(true);
    await delay(DELAY_TIME);
    try {
      await service.updateWish(wish);
      setWishes((prev) => prev.map((w) => (w.id === wish.id ? wish : w)));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error updating wish"));
    } finally {
      setLoadingCRUD(false);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return {
    listName,
    wishes,
    loading,
    loadingCRUD,
    error,
    addWish,
    deleteWish,
    updateWish,
    clearErrors,
  };
}
