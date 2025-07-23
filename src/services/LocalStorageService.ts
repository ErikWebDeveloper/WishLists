export class LocalStorageService implements ILocalStorageService {
  private keyList = "lists";
  private keyWish = "wishes";
  private db = window.localStorage;

  async getLists(): Promise<List[]> {
    const result = this.db.getItem(this.keyList);
    return result ? JSON.parse(result) : [];
  }

  async getListById(listId: string): Promise<List | null> {
    const lists = await this.getLists();
    const [list] = lists.filter((l) => l.id === listId);
    if (!list) return null;
    return list;
  }

  async addList(list: List): Promise<List> {
    const lists = await this.getLists();
    const newList = {
      ...list,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      items: 0,
    };
    this.db.setItem(this.keyList, JSON.stringify([...lists, newList]));
    return newList;
  }

  async deleteList(listId: string): Promise<void> {
    const lists = await this.getLists();
    this.db.setItem(
      this.keyList,
      JSON.stringify(lists.filter((l) => l.id !== listId))
    );

    const wishes = await this.getWishes();
    this.db.setItem(
      this.keyWish,
      JSON.stringify(wishes.filter((w) => w.listId !== listId))
    );
  }

  async updateList(list: List): Promise<void> {
    const lists = await this.getLists();
    this.db.setItem(
      this.keyList,
      JSON.stringify(lists.map((l) => (l.id === list.id ? list : l)))
    );
  }

  async getWishes(): Promise<Wish[]> {
    const result = this.db.getItem(this.keyWish);
    return result ? JSON.parse(result) : [];
  }

  async getWishesByListId(listId: string): Promise<Wish[]> {
    const wishes = await this.getWishes();
    return wishes.filter((w) => w.listId === listId);
  }

  async addWish(wish: Wish): Promise<Wish> {
    const wishes = await this.getWishes();
    const newWish = { ...wish, id: crypto.randomUUID() };
    this.db.setItem(this.keyWish, JSON.stringify([...wishes, newWish]));

    const lists = await this.getLists();
    this.db.setItem(
      this.keyList,
      JSON.stringify(
        lists.map((l) =>
          l.id === wish.listId ? { ...l, items: l.items + 1 } : l
        )
      )
    );

    return newWish;
  }

  async deleteWish(wishId: string): Promise<void> {
    const wishes = await this.getWishes();
    const wish = wishes.find((w) => w.id === wishId);
    if (!wish) return;

    this.db.setItem(
      this.keyWish,
      JSON.stringify(wishes.filter((w) => w.id !== wishId))
    );

    const lists = await this.getLists();
    this.db.setItem(
      this.keyList,
      JSON.stringify(
        lists.map((l) =>
          l.id === wish.listId ? { ...l, items: Math.max(0, l.items - 1) } : l
        )
      )
    );
  }

  async updateWish(wish: Wish): Promise<void> {
    const wishes = await this.getWishes();
    this.db.setItem(
      this.keyWish,
      JSON.stringify(wishes.map((w) => (w.id === wish.id ? wish : w)))
    );
  }
}
