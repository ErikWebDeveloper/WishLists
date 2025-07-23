interface ILocalStorageService {
  getLists(): Promise<List[]>;
  getListById(listId: string): Promise<List | null>;
  addList(list: List): Promise<List>;
  deleteList(listId: string): Promise<void>;
  updateList(list: List): Promise<void>;

  getWishes(): Promise<Wish[]>;
  getWishesByListId(listId: string): Promise<Wish[]>;
  addWish(wish: Wish): Promise<Wish>;
  deleteWish(wishId: string): Promise<void>;
  updateWish(wish: Wish): Promise<void>;
}
