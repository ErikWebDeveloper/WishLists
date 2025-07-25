import supabase from "../utils/supabase";

export class SupabaseService implements ILocalStorageService {
  async getLists(): Promise<List[]> {
    const { data, error } = await supabase
      .from("lists")
      .select("*")
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async getListById(listId: string): Promise<List | null> {
    const { data, error } = await supabase
      .from("lists")
      .select("*")
      .eq("id", listId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // not found
      throw new Error(error.message);
    }

    return data;
  }

  async setVisibilityList(listId: string, isPublic: boolean): Promise<void> {
    const { error } = await supabase
      .from("lists")
      .update({ is_public: isPublic })
      .eq("id", listId);

    if (error) throw new Error(error.message);
  }

  async addList(list: List): Promise<List> {
    const newList = {
      ...list,
      items: 0,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("lists")
      .insert([newList])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteList(listId: string): Promise<void> {
    const { error: wishesError } = await supabase
      .from("wishes")
      .delete()
      .eq("list_id", listId);

    if (wishesError) throw new Error(wishesError.message);

    const { error: listError } = await supabase
      .from("lists")
      .delete()
      .eq("id", listId);

    if (listError) throw new Error(listError.message);
  }

  async updateList(list: List): Promise<void> {
    const { error } = await supabase
      .from("lists")
      .update(list)
      .eq("id", list.id);

    if (error) throw new Error(error.message);
  }

  async getWishes(): Promise<Wish[]> {
    const { data, error } = await supabase.from("wishes").select("*");

    if (error) throw new Error(error.message);
    return data || [];
  }

  async getWishesByListId(listId: string): Promise<Wish[]> {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .eq("list_id", listId);

    if (error) throw new Error(error.message);
    return data || [];
  }

  async addWish(wish: Wish): Promise<Wish> {
    const { listId, ...rest } = wish;

    const newWish: Omit<Wish, "listId"> & { hope: number; list_id: string } = {
      ...rest,
      hope: wish.hope || 0,
      list_id: listId,
    };

    const { data, error } = await supabase
      .from("wishes")
      .insert([newWish])
      .select()
      .single();

    if (error) throw new Error(error.message);

    await supabase.rpc("increment_list_items", { list_id: wish.listId });

    return data;
  }

  async deleteWish(wishId: string): Promise<void> {
    const { data: wish, error: findError } = await supabase
      .from("wishes")
      .select("id, list_id")
      .eq("id", wishId)
      .single();

    if (findError) throw new Error(findError.message);

    const { error: deleteError } = await supabase
      .from("wishes")
      .delete()
      .eq("id", wishId);

    if (deleteError) throw new Error(deleteError.message);

    if (wish?.list_id) {
      await supabase.rpc("decrement_list_items", { list_id: wish.list_id });
    }
  }

  async updateWish(wish: Wish): Promise<void> {
    const { error } = await supabase
      .from("wishes")
      .update(wish)
      .eq("id", wish.id);

    if (error) throw new Error(error.message);
  }

  async saveList(listId: string): Promise<void> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from("saved_lists")
      .insert([{ user_id: userData.user.id, list_id: listId }]);

    if (error) throw new Error(error.message);
  }

  async unsaveList(listId: string): Promise<void> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from("saved_lists")
      .delete()
      .eq("user_id", userData.user.id)
      .eq("list_id", listId);

    if (error) throw new Error(error.message);
  }

  async getSavedLists(): Promise<SavedListView[]> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("saved_lists_view")
      .select("*")
      .eq("user_id", userData.user.id);

    if (error) throw new Error(error.message);

    console.log(data);

    return data;
  }
}
